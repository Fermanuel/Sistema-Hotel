// src/app/api/clientes/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        // Parsear el id del parámetro
        const clienteId = parseInt(params.id);

        if (isNaN(clienteId)) {
            return NextResponse.json({ error: "ID inválido" }, { status: 400 });
        }

        // Eliminar el cliente de la base de datos
        const cliente = await prisma.cliente.delete({
            where: { id: clienteId },
        });

        return NextResponse.json(cliente); // Retorna el cliente eliminado
    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar el cliente" }, { status: 500 });
    }
}