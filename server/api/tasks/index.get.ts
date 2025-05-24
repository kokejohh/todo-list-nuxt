import prisma from '@/server/lib/prisma';

// const globalForPrisma = globalThis as unknown as {
//     prisma: ReturnType<typeof PrismaClient.prototype.$extends> | undefined 
// }

// let prisma;// = globalForPrisma.prisma ?? new PrismaClient().$extends(withAccelerate())

export default defineEventHandler(async event => {
    const tasks = await prisma.tasks.findMany({
        orderBy: {
            order: 'asc'
        }
    });
    return tasks;
})