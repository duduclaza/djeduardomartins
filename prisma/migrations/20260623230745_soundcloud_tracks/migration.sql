-- CreateEnum
CREATE TYPE "TrackSource" AS ENUM ('UPLOAD', 'SOUNDCLOUD');

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "soundcloudUrl" TEXT,
ADD COLUMN     "source" "TrackSource" NOT NULL DEFAULT 'UPLOAD',
ALTER COLUMN "coverUrl" DROP NOT NULL,
ALTER COLUMN "audioUrl" DROP NOT NULL;
