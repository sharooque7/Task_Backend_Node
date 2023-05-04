-- CreateTable
CREATE TABLE "Reset" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Reset_pkey" PRIMARY KEY ("id")
);
