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
exports.ConcertsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let ConcertsService = class ConcertsService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
        this.concertSelect = {
            id: true,
            name: true,
            description: true,
            date: true,
            price: true,
            totalSeats: true,
            reservedSeats: true,
        };
    }
    async findAll() {
        const cacheKey = 'all_concerts';
        try {
            const cached = await this.redis.getClient().get(cacheKey);
            if (cached)
                return JSON.parse(cached);
            const concerts = await this.prisma.client.concert.findMany({ select: this.concertSelect });
            await this.redis.getClient().setex(cacheKey, 3600, JSON.stringify(concerts));
            return concerts;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch concerts');
        }
    }
    async findOne(id) {
        const cacheKey = `concert:${id}`;
        try {
            const cached = await this.redis.getClient().get(cacheKey);
            if (cached)
                return JSON.parse(cached);
            const concert = await this.prisma.client.concert.findUnique({
                where: { id },
                select: this.concertSelect,
            });
            if (!concert)
                throw new common_1.NotFoundException(`Concert with ID ${id} not found`);
            await this.redis.getClient().setex(cacheKey, 3600, JSON.stringify(concert));
            return concert;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to fetch concert details');
        }
    }
    async create(data) {
        try {
            const concert = await this.prisma.client.$transaction(async (tx) => {
                const concert = await tx.concert.create({
                    data,
                    select: this.concertSelect,
                });
                await tx.concert_Booking_Summary.create({
                    data: {
                        concertId: concert.id,
                        totalBookings: 0,
                        totalSeats: 0,
                    },
                });
                return concert;
            });
            await this.redis.getClient().del('all_concerts');
            return concert;
        }
        catch (error) {
            console.error('Create concert error:', error);
            throw new common_1.InternalServerErrorException('Failed to create concert');
        }
    }
    async update(id, data) {
        try {
            const concert = await this.prisma.client.concert.update({
                where: { id },
                data,
                select: this.concertSelect,
            });
            await this.redis.getClient().del('all_concerts');
            await this.redis.getClient().del(`concert:${id}`);
            if (data.totalSeats !== undefined) {
                await this.redis.getClient().del(`concert_seats:${id}`);
            }
            return concert;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update concert');
        }
    }
    async remove(id) {
        console.log(`Starting removal of concert ID: ${id}`);
        try {
            const concert = await this.prisma.client.$transaction(async (tx) => {
                console.log(`Step 1: Deleting booking summary for concert ID: ${id}`);
                await tx.concert_Booking_Summary.deleteMany({
                    where: { concertId: id }
                });
                console.log(`Step 2: Soft deleting concert ID: ${id}`);
                return await tx.concert.update({
                    where: { id },
                    data: { deletedAt: new Date() },
                    select: this.concertSelect,
                });
            });
            console.log(`Step 3: Cleaning up Redis cache for concert ID: ${id}`);
            await this.redis.getClient().del('all_concerts');
            await this.redis.getClient().del(`concert:${id}`);
            await this.redis.getClient().del(`concert_seats:${id}`);
            console.log(`Concert ID: ${id} removed successfully`);
            return concert;
        }
        catch (error) {
            console.error('Detailed Remove concert error:', error);
            throw new common_1.InternalServerErrorException('Failed to remove concert');
        }
    }
};
exports.ConcertsService = ConcertsService;
exports.ConcertsService = ConcertsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], ConcertsService);
//# sourceMappingURL=concerts.service.js.map