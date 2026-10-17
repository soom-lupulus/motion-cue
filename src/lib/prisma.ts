import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const isDatabaseConfigured = Boolean(
  process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== ''
);

export const prisma =
  globalForPrisma.prisma ??
  (isDatabaseConfigured
    ? new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      })
    : (null as unknown as PrismaClient));

if (process.env.NODE_ENV !== 'production' && isDatabaseConfigured) {
  globalForPrisma.prisma = prisma;
}
