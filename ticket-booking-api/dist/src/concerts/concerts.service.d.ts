import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateConcertDto, UpdateConcertDto, ResponseConcertDto } from './dto/concert.dto';
export declare class ConcertsService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    private readonly concertSelect;
    findAll(): Promise<ResponseConcertDto[]>;
    findOne(id: number): Promise<ResponseConcertDto>;
    create(data: CreateConcertDto): Promise<ResponseConcertDto>;
    update(id: number, data: Omit<UpdateConcertDto, 'id'>): Promise<ResponseConcertDto>;
    remove(id: number): Promise<ResponseConcertDto>;
}
