import prisma from '@/server/lib/prisma';
import { Tasks } from '~/generated/prisma-client';


export default defineEventHandler(async event => {
    const body: Partial<Tasks> = await readBody(event);
    const { id, ...fields } = body;

    if (!id) throw new Error('id is required');

    const data = Object.fromEntries( Object.entries(fields).filter(([_, v]) => v !== undefined));

    if (Object.keys(data).length === 0) throw new Error ('nothing to update!');

    const updateTask = await prisma.tasks.update({
        data,
        where: {
            id
        }
    });

    return updateTask;
});