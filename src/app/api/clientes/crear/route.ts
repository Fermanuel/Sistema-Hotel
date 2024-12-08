import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function POST(req: Request) {
    try {

        const { nombre, email } = await req.json();

        if (!nombre || !email) {
            return NextResponse.json(
                { message: "Faltan datos: nombre o email." },
                { status: 400 }
            );
        }

        const nuevoCliente = await prisma.cliente.create({
            data: {
                nombre,
                email,
            },
        });

        return NextResponse.json(nuevoCliente, { status: 201 });
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        return NextResponse.json({ message: "Error al crear el cliente." }, { status: 500 });
    }
}