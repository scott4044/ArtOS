import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  artosPrisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.artosPrisma ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.artosPrisma = prisma;
}
