// import prisma from '@/server/lib/prisma';

import { PrismaClient } from '~/prisma/generated/prisma-client';
// import { withAccelerate } from '@prisma/extension-accelerate';

// const globalForPrisma = globalThis as unknown as {
//     prisma: ReturnType<typeof PrismaClient.prototype.$extends> | undefined 
// }

let prisma;// = globalForPrisma.prisma ?? new PrismaClient().$extends(withAccelerate())


export default defineEventHandler(async event => {
    const prisma = new PrismaClient();//.$extends(withAccelerate());
    return 1;
    // const tasks = await prisma.tasks.findMany({
    //     orderBy: {
    //         order: 'asc'
    //     }
    // });
    // return tasks;
})