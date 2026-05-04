"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const users_1 = require("./seed/users");
const admins_1 = require("./seed/admins");
const concerts_1 = require("./seed/concerts");
const bookings_1 = require("./seed/bookings");
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Starting seed...');
    console.log('Cleaning up existing data...');
    await prisma.concert_Booking_Summary.deleteMany({});
    await prisma.booking_Transaction.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.concert.deleteMany({});
    await prisma.user.deleteMany({});
    await (0, users_1.seedUsers)(prisma);
    await (0, admins_1.seedAdmins)(prisma);
    await (0, concerts_1.seedConcerts)(prisma);
    await (0, bookings_1.seedBookings)(prisma);
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
//# sourceMappingURL=seed.js.map