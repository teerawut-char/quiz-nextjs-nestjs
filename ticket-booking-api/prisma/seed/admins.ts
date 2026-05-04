import { PrismaClient } from '@prisma/client';

export async function seedAdmins(prisma: PrismaClient) {
  console.log('Seeding admins...');
  const admins = [
    {
      email: 'admin@example.com',
      password: 'admin_password',
      name: 'Super Admin',
    },
  ];

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin,
    });
  }
}
