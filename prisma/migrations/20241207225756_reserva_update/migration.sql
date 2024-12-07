-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "habitacionId" INTEGER NOT NULL,
    "checkIn" DATETIME NOT NULL,
    "checkOut" DATETIME,
    "finalizada" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "reserva_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reserva_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "habitacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reserva" ("checkIn", "checkOut", "clienteId", "createdAt", "habitacionId", "id", "updatedAt") SELECT "checkIn", "checkOut", "clienteId", "createdAt", "habitacionId", "id", "updatedAt" FROM "reserva";
DROP TABLE "reserva";
ALTER TABLE "new_reserva" RENAME TO "reserva";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
