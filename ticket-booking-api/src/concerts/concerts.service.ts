import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateConcertDto, UpdateConcertDto, ResponseConcertDto } from './dto/concert.dto';

@Injectable()
export class ConcertsService {
    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
    ) { }

    private readonly concertSelect = {
        id: true,
        name: true,
        description: true,
        date: true,
        price: true,
        totalSeats: true,
        reservedSeats: true,
    };

    async findAll(): Promise<ResponseConcertDto[]> {
        const cacheKey = 'all_concerts';
        try {
            const cached = await this.redis.getClient().get(cacheKey);
            if (cached) return JSON.parse(cached);

            const concerts = await this.prisma.client.concert.findMany({ select: this.concertSelect });
            await this.redis.getClient().setex(cacheKey, 3600, JSON.stringify(concerts));
            return concerts;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch concerts');
        }
    }

    async findOne(id: number): Promise<ResponseConcertDto> {
        const cacheKey = `concert:${id}`;
        try {
            const cached = await this.redis.getClient().get(cacheKey);
            if (cached) return JSON.parse(cached);

            const concert = await this.prisma.client.concert.findUnique({
                where: { id },
                select: this.concertSelect,
            });
            if (!concert) throw new NotFoundException(`Concert with ID ${id} not found`);
            
            await this.redis.getClient().setex(cacheKey, 3600, JSON.stringify(concert));
            return concert;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to fetch concert details');
        }
    }

    async create(data: CreateConcertDto): Promise<ResponseConcertDto> {
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
        } catch (error) {
            console.error('Create concert error:', error);
            throw new InternalServerErrorException('Failed to create concert');
        }
    }

    async update(id: number, data: Omit<UpdateConcertDto, 'id'>): Promise<ResponseConcertDto> {
        try {
            const concert = await this.prisma.client.concert.update({
                where: { id },
                data,
                select: this.concertSelect,
            });
            
            await this.redis.getClient().del('all_concerts');
            await this.redis.getClient().del(`concert:${id}`);
            // Also invalidate seat count if totalSeats changed
            if (data.totalSeats !== undefined) {
                await this.redis.getClient().del(`concert_seats:${id}`);
            }
            
            return concert;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update concert');
        }
    }

    async remove(id: number): Promise<ResponseConcertDto> {
        console.log(`Starting removal of concert ID: ${id}`);
        try {
            const concert = await this.prisma.client.$transaction(async (tx) => {
                console.log(`Step 1: Deleting booking summary for concert ID: ${id}`);
                await tx.concert_Booking_Summary.deleteMany({
                    where: { concertId: id }
                });

                console.log(`Step 2: Soft deleting concert ID: ${id}`);
                // Use update instead of delete for soft delete
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
        } catch (error) {
            console.error('Detailed Remove concert error:', error);
            throw new InternalServerErrorException('Failed to remove concert');
        }
    }
}
