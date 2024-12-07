import { NextResponse } from "next/server";
import prisma from "../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

export async function GET() {
    try {
        // Consulta de reservas con los datos del cliente y la habitación relacionados
        const reservaciones = await prisma.reserva.findMany({
            include: {
                cliente: true,      // Incluye la información del cliente relacionado
                habitacion: true,   // Incluye la información de la habitación relacionada
            },
        });

        // Devolver las reservas con cliente y habitación
        return NextResponse.json(reservaciones);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener reservaciones" }, { status: 500 });
    }
}