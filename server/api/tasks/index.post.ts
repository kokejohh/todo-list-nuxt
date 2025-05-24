import prisma from '@/server/lib/prisma';
import { Tasks } from '~/generated/prisma-client';

export default defineEventHandler(async(event) => {
    const body: Tasks = await readBody(event);

    const createTask = await prisma.tasks.create({
        data: {
            detail: body.detail,
            order: body.order
        }
    });

    return createTask;
    
});