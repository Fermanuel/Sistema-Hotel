import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

// En tu API de habitaciones
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Obtener el estado desde la solicitud
        const { estado } = await req.json();

        // Verificar que el estado esté presente
        if (!estado) {
            return NextResponse.json({ message: "Falta el estado" }, { status: 400 });
        }

        // Verificar si la habitación existe
        const habitacionExistente = await prisma.habitacion.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (!habitacionExistente) {
            return NextResponse.json(
                { message: "Habitación no encontrada." },
                { status: 404 }
            );
        }

        // Actualizar solo el estado
        const habitacionActualizada = await prisma.habitacion.update({
            where: { id: parseInt(params.id) },
            data: { estado },
        });

        // Retornar la habitación actualizada
        return NextResponse.json(habitacionActualizada, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar el estado de la habitación:", error);
        return NextResponse.json({ message: "Error al actualizar el estado de la habitación." }, { status: 500 });
    }
}
