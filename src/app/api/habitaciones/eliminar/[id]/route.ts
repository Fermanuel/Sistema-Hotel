import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

// Manejar las solicitudes DELETE (eliminar habitación)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
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

        // Eliminar la habitación de la base de datos
        await prisma.habitacion.delete({
            where: { id: parseInt(params.id) },
        });

        // Retornar una respuesta exitosa
        return NextResponse.json(
            { message: "Habitación eliminada exitosamente." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al eliminar la habitación:", error);
        return NextResponse.json({ message: "Error al eliminar la habitación." }, { status: 500 });
    }
}
