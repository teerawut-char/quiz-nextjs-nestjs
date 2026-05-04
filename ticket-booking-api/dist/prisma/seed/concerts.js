"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedConcerts = seedConcerts;
async function seedConcerts(prisma) {
    console.log('Seeding concerts...');
    const concerts = [
        {
            name: 'Rock Fest 2026',
            description: 'A massive rock concert featuring top bands.',
            date: new Date('2026-08-15T18:00:00Z'),
            price: 1500.0,
            totalSeats: 5000,
            reservedSeats: 0,
        },
        {
            name: 'Jazz Night',
            description: 'A smooth evening with world-class jazz musicians.',
            date: new Date('2026-09-20T19:30:00Z'),
            price: 1200.0,
            totalSeats: 1000,
            reservedSeats: 0,
        },
    ];
    for (const concert of concerts) {
        await prisma.concert.create({
            data: concert,
        });
    }
}
//# sourceMappingURL=concerts.js.map