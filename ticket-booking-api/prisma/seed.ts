import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seed/users';
import { seedAdmins } from './seed/admins';
import { seedConcerts } from './seed/concerts';
import { seedBookings } from './seed/bookings';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  console.log('Cleaning up existing data...');
  await prisma.booking_Transaction.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.concert.deleteMany({});
  await prisma.admin.deleteMany({});
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
