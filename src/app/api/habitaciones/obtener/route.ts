import { NextResponse } from "next/server";
import prisma from "../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

export async function GET() {
    try {
        const habitaciones = await prisma.habitacion.findMany();
        return NextResponse.json(habitaciones);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener habitaciones" }, { status: 500 });
    }
}
