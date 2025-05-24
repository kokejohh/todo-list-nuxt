import prisma from '@/server/lib/prisma';
import { Tasks } from '~/generated/prisma-client';


export default defineEventHandler(async event => {
    const body: Tasks = await readBody(event);
    const { detail } = body;

    const updateTask = await prisma.tasks.update({
        data: {
            detail,
        },
        where: {
            id: body.id
        }
    });

    return updateTask;
});