"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let BookingsService = class BookingsService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
        this.bookingSelect = {
            id: true,
            userId: true,
            concertId: true,
            numSeats: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        };
        this.bookingDetailSelect = {
            ...this.bookingSelect,
            user: { select: { id: true, name: true, email: true } },
            concert: { select: { id: true, name: true, date: true } },
            transactions: { select: { id: true, amount: true, status: true, createdAt: true } },
        };
    }
    async findAll(userId) {
        try {
            return await this.prisma.client.booking.findMany({
                where: userId ? { userId } : {},
                select: this.bookingDetailSelect,
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch bookings');
        }
    }
    async findOne(id) {
        try {
            const booking = await this.prisma.client.booking.findUnique({
                where: { id },
                select: this.bookingDetailSelect,
            });
            if (!booking)
                throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
            return booking;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to fetch booking details');
        }
    }
    async create(data) {
        const { userId, concertId, numSeats } = data;
        const redisKey = `concert_seats:${concertId}`;
        try {
            const existingBooking = await this.prisma.client.booking.findFirst({
                where: {
                    userId,
                    concertId,
                },
            });
            if (existingBooking && existingBooking.status === 'RESERVED') {
                throw new common_1.BadRequestException('You already have an active reservation for this concert');
            }
            const redisClient = this.redis.getClient();
            let availableSeats = await redisClient.get(redisKey);
            if (availableSeats === null) {
                const concert = await this.prisma.client.concert.findUnique({
                    where: { id: concertId },
                });
                if (!concert)
                    throw new common_1.BadRequestException('Concert not found');
                const initialAvailable = concert.totalSeats - concert.reservedSeats;
                await redisClient.set(redisKey, initialAvailable);
                availableSeats = initialAvailable.toString();
            }
            if (parseInt(availableSeats) < numSeats) {
                throw new common_1.BadRequestException('Not enough seats available');
            }
            const remaining = await redisClient.decrby(redisKey, numSeats);
            if (remaining < 0) {
                await redisClient.incrby(redisKey, numSeats);
                throw new common_1.BadRequestException('Not enough seats available');
            }
            try {
                return await this.prisma.client.$transaction(async (tx) => {
                    const concert = await tx.concert.findUnique({
                        where: { id: concertId },
                    });
                    if (!concert) {
                        throw new common_1.BadRequestException('Concert not found');
                    }
                    if (concert.reservedSeats + numSeats > concert.totalSeats) {
                        throw new common_1.BadRequestException('Not enough seats available');
                    }
                    let booking;
                    if (existingBooking) {
                        booking = await tx.booking.update({
                            where: { id: existingBooking.id },
                            data: {
                                status: 'RESERVED',
                                numSeats,
                            },
                            select: this.bookingSelect,
                        });
                    }
                    else {
                        booking = await tx.booking.create({
                            data: {
                                userId,
                                concertId,
                                numSeats,
                                status: 'RESERVED',
                            },
                            select: this.bookingSelect,
                        });
                    }
                    await tx.booking_Transaction.create({
                        data: {
                            bookingId: booking.id,
                            amount: concert.price * numSeats,
                            status: 'SUCCESS'
                        }
                    });
                    await tx.concert.update({
                        where: { id: concertId },
                        data: {
                            reservedSeats: {
                                increment: numSeats,
                            },
                        },
                    });
                    return booking;
                });
            }
            catch (dbError) {
                await redisClient.incrby(redisKey, numSeats);
                throw dbError;
            }
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to process booking');
        }
    }
    async cancel(id) {
        try {
            return await this.prisma.client.$transaction(async (tx) => {
                const booking = await tx.booking.findUnique({
                    where: { id },
                    include: { concert: true },
                });
                if (!booking || booking.status === 'CANCELLED') {
                    throw new common_1.BadRequestException('Booking not found or already cancelled');
                }
                const updatedBooking = await tx.booking.update({
                    where: { id },
                    data: { status: 'CANCELLED' },
                    select: this.bookingSelect,
                });
                await tx.booking_Transaction.create({
                    data: {
                        bookingId: id,
                        amount: -(booking.concert.price * booking.numSeats),
                        status: 'CANCELLED'
                    }
                });
                await tx.concert.update({
                    where: { id: booking.concertId },
                    data: {
                        reservedSeats: {
                            decrement: booking.numSeats,
                        },
                    },
                });
                const redisKey = `concert_seats:${booking.concertId}`;
                await this.redis.getClient().incrby(redisKey, booking.numSeats);
                return updatedBooking;
            });
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to cancel booking');
        }
    }
    async findTransactions(userId) {
        try {
            return await this.prisma.client.booking_Transaction.findMany({
                where: {
                    booking: {
                        userId: Number(userId),
                    },
                },
                include: {
                    booking: {
                        include: {
                            concert: {
                                select: {
                                    name: true,
                                    date: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch transaction history');
        }
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map