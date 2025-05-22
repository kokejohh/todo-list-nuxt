-- CreateEnum
CREATE TYPE "statusTask" AS ENUM ('DOING', 'DONE');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "status" "statusTask" NOT NULL DEFAULT 'DOING';
