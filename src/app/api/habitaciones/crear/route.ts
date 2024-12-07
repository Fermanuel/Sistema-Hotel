import { NextResponse } from "next/server";
import prisma from "../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

// Manejar las solicitudes POST (crear habitación)
export async function POST(req: Request) {
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

        // Crear una nueva habitación en la base de datos
        const nuevaHabitacion = await prisma.habitacion.create({
            data: {
                numero,
                tipo,
                precio,
                descripcion,
            },
        });

        // Retornar la habitación creada en la respuesta
        return NextResponse.json(nuevaHabitacion, { status: 201 });
    } catch (error) {
        console.error("Error al crear la habitación:", error);
        return NextResponse.json({ message: "Error al crear la habitación." }, { status: 500 });
    }
}
