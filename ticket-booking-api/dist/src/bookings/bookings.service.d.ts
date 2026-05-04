import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateBookingDto, ResponseCreateBookingDto, ResponseBookingDetailDto } from './dto/booking.dto';
export declare class BookingsService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    private readonly bookingSelect;
    private readonly bookingDetailSelect;
    findAll(userId?: number): Promise<ResponseBookingDetailDto[]>;
    findOne(id: number): Promise<ResponseBookingDetailDto>;
    create(data: CreateBookingDto): Promise<ResponseCreateBookingDto>;
    cancel(id: number): Promise<ResponseCreateBookingDto>;
    findTransactions(userId: number): Promise<any>;
}
