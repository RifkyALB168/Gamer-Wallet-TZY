-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "gameId" VARCHAR(16) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "coverUrl" TEXT,
    "priceUsd" DECIMAL(10,2) NOT NULL,
    "note" VARCHAR(500) NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WishlistItem_userId_createdAt_id_idx" ON "WishlistItem"("userId", "createdAt", "id");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_userId_gameId_key" ON "WishlistItem"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
