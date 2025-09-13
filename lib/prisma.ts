import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Create Prisma client with Vercel-specific configuration
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// Initialize Prisma client with error handling
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, create a new instance
  prisma = createPrismaClient();
} else {
  // In development, use global instance to prevent multiple connections
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
export default prisma;
