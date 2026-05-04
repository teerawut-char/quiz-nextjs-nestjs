import { PrismaClient, BookingStatus } from '@prisma/client';

export async function seedBookings(prisma: PrismaClient) {
  console.log('Seeding bookings...');
  
  const user = await prisma.user.findFirst();
  const concert = await prisma.concert.findFirst();

  if (!user || !concert) {
    console.log('No user or concert found, skipping booking seed.');
    return;
  }

  await prisma.booking.create({
    data: {
      userId: user.id,
      concertId: concert.id,
      numSeats: 2,
      status: BookingStatus.RESERVED,
      transactions: {
        create: {
          amount: concert.price * 2,
          status: 'SUCCESS',
        },
      },
    },
  });
}
