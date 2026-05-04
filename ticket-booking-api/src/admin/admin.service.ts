import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const concerts = await this.prisma.client.concert.findMany({
      select: {
        totalSeats: true,
        reservedSeats: true,
      },
    });

    const totalSeats = concerts.reduce((acc, c) => acc + c.totalSeats, 0);
    const reservedSeats = concerts.reduce((acc, c) => acc + c.reservedSeats, 0);
    
    const cancelledBookings = await this.prisma.client.booking.count({
      where: {
        status: 'CANCELLED',
      },
    });

    // For cancelled seats, we should ideally sum numSeats where status is CANCELLED
    const cancelledSeatsData = await this.prisma.client.booking.aggregate({
      where: {
        status: 'CANCELLED',
      },
      _sum: {
        numSeats: true,
      },
    });

    return {
      totalSeats,
      reservedSeats,
      cancelledSeats: cancelledSeatsData._sum.numSeats || 0,
    };
  }
}
