import { NextResponse } from "next/server";
import prisma from "../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

// Manejar la solicitud POST (crear reservación)
export async function POST(req: Request) {
    try {
      const { clienteId, habitacionId, checkIn, checkOut } = await req.json();
  
      console.log("Datos recibidos por el servidor:", { clienteId, habitacionId, checkIn, checkOut });
  
      if (!clienteId || !habitacionId || !checkIn) {
        return NextResponse.json(
          { message: "Faltan datos obligatorios: clienteId, habitacionId o checkIn" },
          { status: 400 }
        );
      }
  
      const nuevaReservacion = await prisma.reserva.create({
        data: {
          clienteId: parseInt(clienteId),
          habitacionId: parseInt(habitacionId),
          checkIn: new Date(checkIn),
          checkOut: checkOut ? new Date(checkOut) : null, // Maneja null para fechas opcionales
        },
      });
  
      return NextResponse.json(nuevaReservacion, { status: 201 });
    } catch (error) {
      console.error("Error al crear la reservación:", error);
      return NextResponse.json({ message: "Error al crear la reservación." }, { status: 500 });
    }
  }
  
