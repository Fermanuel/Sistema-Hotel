// /api/reservas/[id].ts
import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Eliminar la reservación de la base de datos
    await prisma.reserva.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Reservación eliminada" }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la reservación:", error);
    return NextResponse.json({ message: "Error al eliminar la reservación." }, { status: 500 });
  }
}