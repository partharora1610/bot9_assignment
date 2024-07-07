-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "botId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Converstaion" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Converstaion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingData" (
    "id" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "examples" TEXT[],

    CONSTRAINT "TrainingData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotDesign" (
    "id" TEXT NOT NULL,
    "botId" TEXT NOT NULL,
    "design" JSONB NOT NULL,

    CONSTRAINT "BotDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "User_botId_key" ON "User"("botId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingData" ADD CONSTRAINT "TrainingData_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BotDesign" ADD CONSTRAINT "BotDesign_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Converstaion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
