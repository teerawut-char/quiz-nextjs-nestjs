"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
async function check() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new pg_1.Pool({ connectionString });
    const adapter = new adapter_pg_1.PrismaPg(pool);
    const prisma = new client_1.PrismaClient({ adapter });
    const concerts = await prisma.concert.findMany();
    console.log('Current Concerts in DB:', JSON.stringify(concerts, null, 2));
    const users = await prisma.user.findMany();
    console.log('Current Users in DB:', JSON.stringify(users, null, 2));
    const bookings = await prisma.booking.findMany();
    console.log('Current Bookings in DB:', JSON.stringify(bookings, null, 2));
    await prisma.$disconnect();
    await pool.end();
}
check();
//# sourceMappingURL=check_db.js.map