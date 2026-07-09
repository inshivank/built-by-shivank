ALTER TABLE "Certification" ADD COLUMN "credentialId" TEXT;
ALTER TABLE "Certification" ADD COLUMN "expiryDate" TEXT;
ALTER TABLE "Certification" ADD COLUMN "skills" TEXT NOT NULL DEFAULT '[]';
ALTER TABLE "Certification" ADD COLUMN "description" TEXT;
ALTER TABLE "Certification" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT true;
