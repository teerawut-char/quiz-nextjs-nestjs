"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmins = seedAdmins;
const bcrypt = require("bcrypt");
async function seedAdmins(prisma) {
    console.log('Seeding admins...');
    const admins = [
        {
            email: 'admin@example.com',
            password: 'admin_password',
            name: 'Super Admin',
        },
    ];
    for (const admin of admins) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        await prisma.user.upsert({
            where: { email: admin.email },
            update: {},
            create: {
                ...admin,
                password: hashedPassword,
                role: 'ADMIN',
            },
        });
    }
}
//# sourceMappingURL=admins.js.map