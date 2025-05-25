import prisma from "@/server/lib/prisma";

export default defineEventHandler(async event => {
    const getRouter = getRouterParams(event);
    const deleteTask = await prisma.tasks.delete({
        where: {
            id: parseInt(getRouter.id)
        }
    })
    return deleteTask;
});