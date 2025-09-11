-- CreateTable
CREATE TABLE "Vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegramId" INTEGER NOT NULL,
    "firstName" TEXT
);

-- CreateTable
CREATE TABLE "Paycheck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" INTEGER NOT NULL,
    "payDate" DATETIME NOT NULL,
    "serviceName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,
    CONSTRAINT "Paycheck_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_telegramId_key" ON "Vendor"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Paycheck_phoneNumber_key" ON "Paycheck"("phoneNumber");
