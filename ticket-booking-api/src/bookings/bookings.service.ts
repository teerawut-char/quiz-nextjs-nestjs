import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateBookingDto, ResponseCreateBookingDto, ResponseBookingDetailDto } from './dto/booking.dto';

@Injectable()
export class BookingsService {
    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
    ) { }

    private readonly bookingSelect = {
        id: true,
        userId: true,
        concertId: true,
        numSeats: true,
        status: true,
        createdAt: true,
        updatedAt: true,
    };

    private readonly bookingDetailSelect = {
        ...this.bookingSelect,
        user: { select: { id: true, name: true, email: true } },
        concert: { select: { id: true, name: true, date: true } },
        transactions: { select: { id: true, amount: true, status: true, createdAt: true } },
    };

    async findAll(): Promise<ResponseBookingDetailDto[]> {
        try {
            return await this.prisma.client.booking.findMany({
                select: this.bookingDetailSelect,
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch bookings');
        }
    }

    async findOne(id: number): Promise<ResponseBookingDetailDto> {
        try {
            const booking = await this.prisma.client.booking.findUnique({
                where: { id },
                select: this.bookingDetailSelect,
            });
            if (!booking) throw new NotFoundException(`Booking with ID ${id} not found`);
            return booking;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch booking details');
        }
    }

    async create(data: CreateBookingDto): Promise<ResponseCreateBookingDto> {
        const { userId, concertId, numSeats } = data;
        const redisKey = `concert_seats:${concertId}`;

        try {
            const redisClient = this.redis.getClient();
            
            // Try to decrement seats in Redis first
            let availableSeats = await redisClient.get(redisKey);
            
            if (availableSeats === null) {
                // Initialize Redis from DB if not present
                const concert = await this.prisma.client.concert.findUnique({
                    where: { id: concertId },
                });
                if (!concert) throw new BadRequestException('Concert not found');
                
                const initialAvailable = concert.totalSeats - concert.reservedSeats;
                await redisClient.set(redisKey, initialAvailable);
                availableSeats = initialAvailable.toString();
            }

            if (parseInt(availableSeats) < numSeats) {
                throw new BadRequestException('Not enough seats available');
            }

            // Atomic decrement
            const remaining = await redisClient.decrby(redisKey, numSeats);
            if (remaining < 0) {
                // Rollback if we went below zero
                await redisClient.incrby(redisKey, numSeats);
                throw new BadRequestException('Not enough seats available');
            }

            try {
                return await this.prisma.client.$transaction(async (tx) => {
                    const concert = await tx.concert.findUnique({
                        where: { id: concertId },
                    });

                    if (!concert) {
                        throw new BadRequestException('Concert not found');
                    }

                    if (concert.reservedSeats + numSeats > concert.totalSeats) {
                        throw new BadRequestException('Not enough seats available');
                    }

                    const booking = await tx.booking.create({
                        data: {
                            userId,
                            concertId,
                            numSeats,
                            status: 'RESERVED',
                        },
                        select: this.bookingSelect,
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
            } catch (dbError) {
                // Rollback Redis if DB transaction fails
                await redisClient.incrby(redisKey, numSeats);
                throw dbError;
            }
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to process booking');
        }
    }

    async cancel(id: number): Promise<ResponseCreateBookingDto> {
        try {
            return await this.prisma.client.$transaction(async (tx) => {
                const booking = await tx.booking.findUnique({
                    where: { id },
                });

                if (!booking || booking.status === 'CANCELLED') {
                    throw new BadRequestException('Booking not found or already cancelled');
                }


                const updatedBooking = await tx.booking.update({
                    where: { id },
                    data: { status: 'CANCELLED' },
                    select: this.bookingSelect,
                });


                await tx.concert.update({
                    where: { id: booking.concertId },
                    data: {
                        reservedSeats: {
                            decrement: booking.numSeats,
                        },
                    },
                });

                // Update Redis availability
                const redisKey = `concert_seats:${booking.concertId}`;
                await this.redis.getClient().incrby(redisKey, booking.numSeats);

                return updatedBooking;
            });
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException('Failed to cancel booking');
        }
    }
}
