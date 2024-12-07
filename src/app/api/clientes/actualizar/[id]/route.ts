import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

// Método para actualizar un cliente
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      const { nombre, email } = await req.json();
  
      // Verificar que los campos requeridos estén presentes
      if (!nombre || !email) {
        return NextResponse.json({ message: "Faltan datos: nombre o email." }, { status: 400 });
      }
  
      const clienteId = parseInt(params.id);
  
      if (isNaN(clienteId)) {
        return NextResponse.json({ error: "ID inválido" }, { status: 400 });
      }
  
      // Actualizar el cliente en la base de datos
      const clienteActualizado = await prisma.cliente.update({
        where: { id: clienteId },
        data: {
          nombre,
          email,
        },
      });
  
      return NextResponse.json(clienteActualizado);
    } catch (error) {
      return NextResponse.json({ message: "Error al actualizar el cliente" }, { status: 500 });
    }
  }