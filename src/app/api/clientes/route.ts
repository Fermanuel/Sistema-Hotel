// src/app/api/clientes/route.ts

import { NextResponse } from "next/server";
import prisma from "../../../lib/db"; // Asegúrate de que la ruta hacia `prisma` es correcta

// Manejar las solicitudes POST (crear cliente)
export async function POST(req: Request) {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { nombre, email } = await req.json();

        console.log("nombre", nombre);
        console.log("email", email);

        // Verificar que los campos requeridos estén presentes
        if (!nombre || !email) {
            return NextResponse.json(
                { message: "Faltan datos: nombre o email." },
                { status: 400 }
            );
        }

        // Crear un nuevo cliente en la base de datos
        const nuevoCliente = await prisma.cliente.create({
            data: {
                nombre,
                email,
            },
        });

        // Retornar el cliente creado en la respuesta
        return NextResponse.json(nuevoCliente, { status: 201 });
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        return NextResponse.json({ message: "Error al crear el cliente." }, { status: 500 });
    }
}

export async function GET() {
    try {
        const clientes = await prisma.cliente.findMany();
        return NextResponse.json(clientes);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener clientes" }, { status: 500 });
    }
}