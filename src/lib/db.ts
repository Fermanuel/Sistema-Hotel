import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

/**
 * Extiende el objeto globalThis para incluir una propiedad prismaGlobal.
 * La propiedad prismaGlobal es del tipo devuelto por la función prismaClientSingleton.
 * Esto permite tener una instancia de cliente Prisma accesible globalmente.
 */
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma