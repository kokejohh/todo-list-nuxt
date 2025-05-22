import { PrismaClient } from '~/generated/prisma-client';
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany();
  return users;
});