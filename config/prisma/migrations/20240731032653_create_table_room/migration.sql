-- CreateEnum
CREATE TYPE "roomTypeEnum" AS ENUM ('RANDOM', 'STUDY', 'REMINDER');

-- CreateEnum
CREATE TYPE "roomVisibilityEnum" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "userRoomRoleEnum" AS ENUM ('HOST', 'MEMBER');

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "visibility" "roomVisibilityEnum" NOT NULL DEFAULT 'PUBLIC',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "roomTypeEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_rooms" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,
    "role" "userRoomRoleEnum" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_rooms" ADD CONSTRAINT "users_rooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rooms" ADD CONSTRAINT "users_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
