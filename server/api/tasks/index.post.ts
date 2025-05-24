import prisma from '@/server/lib/prisma';
import { Tasks } from '~/generated/prisma-client';

export default defineEventHandler(async(event) => {
    const body: Partial<Tasks> = await readBody(event);

    const maxOrder = await prisma.tasks.aggregate({
        _max: {
            order: true
        }
    });

    const { detail } = body;

    if (detail === undefined) throw new Error('no detail for create task');

    const order = (maxOrder._max.order ?? 0) + 1;

    const createTask = await prisma.tasks.create({
        data: {
            detail,
            order
        }
    });

    return createTask;
    
});