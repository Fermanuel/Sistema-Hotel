// /api/reservas/finalizar/[id].ts
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Obtener la fecha y hora actuales
    const fechaActual = new Date();

    // Actualizar la reservación con `checkOut` y marcarla como finalizada
    const reservaActualizada = await prisma.reserva.update({
      where: { id: parseInt(id) },
      data: { 
        finalizada: true, 
        checkOut: fechaActual, // Actualizar el campo `checkOut`
      },
    });

    return NextResponse.json(reservaActualizada, { status: 200 });
  } catch (error) {
    console.error("Error al finalizar la reservación:", error);
    return NextResponse.json({ message: "Error al finalizar la reservación." }, { status: 500 });
  }
}
