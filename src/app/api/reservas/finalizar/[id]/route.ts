import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Obtener la fecha y hora actuales
    const fechaActual = new Date();

    // Primero, obtener la reservación para acceder a la habitación asociada
    const reserva = await prisma.reserva.findUnique({
      where: { id: parseInt(id) },
      include: { habitacion: true } // Incluir la habitación relacionada
    });

    if (!reserva) {
      return NextResponse.json({ message: "Reservación no encontrada." }, { status: 404 });
    }

    // Actualizar la reservación con `checkOut` y marcarla como finalizada
    const reservaActualizada = await prisma.reserva.update({
      where: { id: parseInt(id) },
      data: { 
        finalizada: true, 
        checkOut: fechaActual, // Actualizar el campo `checkOut`
      },
    });

    // Luego, actualizar el estado de la habitación a "disponible"
    await prisma.habitacion.update({
      where: { id: reserva.habitacion.id }, // Usamos el ID de la habitación asociada a la reservación
      data: { estado: "disponible" }, // Establecer el estado a "disponible"
    });

    return NextResponse.json(reservaActualizada, { status: 200 });
  } catch (error) {
    console.error("Error al finalizar la reservación:", error);
    return NextResponse.json({ message: "Error al finalizar la reservación." }, { status: 500 });
  }
}
