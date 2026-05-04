import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedUsers } from './seed/users';
import { seedAdmins } from './seed/admins';
import { seedConcerts } from './seed/concerts';
import { seedBookings } from './seed/bookings';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  console.log('Cleaning up existing data...');
  await prisma.concert_Booking_Summary.deleteMany({});
  await prisma.booking_Transaction.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.concert.deleteMany({});
  await prisma.user.deleteMany({});


  await seedUsers(prisma);
  await seedAdmins(prisma);
  await seedConcerts(prisma);
  await seedBookings(prisma);

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
