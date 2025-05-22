import prisma from '@/server/lib/prisma';
import { Tasks } from '~/generated/prisma-client';

export default defineEventHandler(async(event) => {
    const body: Tasks = await readBody(event);

    const countDoingTask = await prisma.tasks.count({
        where: {
            status: 'DOING'
        }
    })
    const createTask = await prisma.tasks.create({
        data: {
            detail: body.detail,
            order: countDoingTask + 1
        }
    });

    return createTask;
});