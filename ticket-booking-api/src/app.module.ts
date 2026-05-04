import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConcertsModule } from './concerts/concerts.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    ConcertsModule,
    BookingsModule,
    AuthModule,
    RedisModule,
    AdminModule,
  ],
})
export class AppModule {}
