import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalSeats: any;
        reservedSeats: any;
        cancelledSeats: any;
    }>;
}
