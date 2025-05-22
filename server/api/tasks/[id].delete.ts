import prisma from "@/server/lib/prisma";
import { Tasks } from "~/generated/prisma-client";

export default defineEventHandler(async event => {
    const getRouter = getRouterParams(event);
    const deleteTask = await prisma.tasks.delete({
        where: {
            id: parseInt(getRouter.id)
        }
    })
    return deleteTask;
});