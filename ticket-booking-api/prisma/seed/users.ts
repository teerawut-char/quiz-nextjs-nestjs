import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding users...');
  const users = [
    {
      email: 'user1@example.com',
      password: 'hashed_password_1',
      name: 'John Doe',
    },
    {
      email: 'user2@example.com',
      password: 'hashed_password_2',
      name: 'Jane Smith',
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        password: hashedPassword,
      },
    });
  }
}
