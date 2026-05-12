-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "Rota" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "trajeto" geometry(LineString, 4326) NOT NULL,

    CONSTRAINT "Rota_pkey" PRIMARY KEY ("id")
);
