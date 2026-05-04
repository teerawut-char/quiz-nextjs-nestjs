"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBookings = seedBookings;
const client_1 = require("@prisma/client");
async function seedBookings(prisma) {
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
            status: client_1.BookingStatus.RESERVED,
            transactions: {
                create: {
                    amount: concert.price * 2,
                    status: 'SUCCESS',
                },
            },
        },
    });
}
//# sourceMappingURL=bookings.js.map