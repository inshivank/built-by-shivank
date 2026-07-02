-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "developerName" TEXT NOT NULL DEFAULT 'Shivank Choudhary',
    "siteTitle" TEXT NOT NULL DEFAULT 'Built by Shivank',
    "canonicalUrl" TEXT NOT NULL DEFAULT 'https://builtbyshivank.com'
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "eyebrow" TEXT NOT NULL,
    "mainHeading" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primaryBtnText" TEXT NOT NULL DEFAULT 'View Projects',
    "secondaryBtnText" TEXT NOT NULL DEFAULT 'Download Resume',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HeroBadge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "heroId" TEXT NOT NULL DEFAULT 'singleton',
    CONSTRAINT "HeroBadge_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "About" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "title" TEXT NOT NULL DEFAULT 'About Me',
    "subtitle" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AboutValue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "aboutId" TEXT NOT NULL DEFAULT 'singleton',
    CONSTRAINT "AboutValue_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AboutMilestone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "aboutId" TEXT NOT NULL DEFAULT 'singleton',
    CONSTRAINT "AboutMilestone_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SkillCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "proficiency" INTEGER NOT NULL DEFAULT 80,
    "order" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Skill_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SkillCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "logoUrl" TEXT,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "progressYear" TEXT NOT NULL,
    "progressPct" INTEGER NOT NULL DEFAULT 0,
    "gpa" TEXT,
    "coursework" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Leadership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "credentialUrl" TEXT NOT NULL,
    "logoUrl" TEXT,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "heroDescription" TEXT,
    "problem" TEXT,
    "solution" TEXT,
    "features" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "architecture" TEXT,
    "challenges" TEXT,
    "lessonsLearned" TEXT,
    "futureImprovements" TEXT,
    "github" TEXT,
    "liveDemo" TEXT,
    "caseStudy" TEXT,
    "coverImage" TEXT,
    "demoVideo" TEXT,
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "duration" TEXT,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "github" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "leetcode" TEXT,
    "codeforces" TEXT,
    "phone" TEXT,
    "resumeUrl" TEXT,
    "resumeFilename" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
