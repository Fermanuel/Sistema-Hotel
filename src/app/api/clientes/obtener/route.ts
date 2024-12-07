import { NextResponse } from "next/server";
import prisma from "../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

export async function GET() {
    try {
        const clientes = await prisma.cliente.findMany();
        return NextResponse.json(clientes);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener clientes" }, { status: 500 });
    }
}