import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function GET() {
    try {

        const reservaciones = await prisma.reserva.findMany({
            include: {
                cliente: true,
                habitacion: true,
            },
        });

        return NextResponse.json(reservaciones);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener reservaciones" }, { status: 500 });
    }
}