import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

// Manejar las solicitudes PUT (actualizar habitación)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { numero, tipo, precio, descripcion } = await req.json();

        // Verificar que los campos requeridos estén presentes
        if (numero === undefined || !tipo || precio === undefined) {
            return NextResponse.json(
                { message: "Faltan datos: numero, tipo o precio." },
                { status: 400 }
            );
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

        // Actualizar la habitación en la base de datos
        const habitacionActualizada = await prisma.habitacion.update({
            where: { id: parseInt(params.id) },
            data: {
                numero,
                tipo,
                precio,
                descripcion,
            },
        });

        // Retornar la habitación actualizada en la respuesta
        return NextResponse.json(habitacionActualizada, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar la habitación:", error);
        return NextResponse.json({ message: "Error al actualizar la habitación." }, { status: 500 });
    }
}
