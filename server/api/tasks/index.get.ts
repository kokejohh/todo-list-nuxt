import prisma from '@/server/lib/prisma';

export default defineEventHandler(async event => {
    const tasks = await prisma.tasks.findMany({
        orderBy: {
            order: 'asc'
        }
    });
    return tasks;
})