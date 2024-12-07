"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoAdd, IoEye, IoPencil, IoTrash } from "react-icons/io5";

export default function Page() {
  // Estado para los inputs de nombre y email
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  // Estado para los clientes
  const [clientes, setClientes] = useState<any[]>([]);

  // Función para obtener los clientes
  const fetchClientes = async () => {
    const response = await fetch("/api/clientes/obtener");
    if (response.ok) {
      const data = await response.json();
      setClientes(data); // Actualiza el estado con los clientes obtenidos
    } else {
      alert("Error al obtener los clientes.");
    }
  };

  // Llamada a la API para crear un cliente
  const createCliente = async () => {
    const response = await fetch("/api/clientes/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email }),
    });

    if (response.ok) {
      const nuevoCliente = await response.json();
      setClientes([...clientes, nuevoCliente]); // Actualiza la lista de clientes con el nuevo cliente
    } else {
      alert("Error al crear el cliente.");
    }
  };

  // Llamada a la API para eliminar un cliente
  const deleteCliente = async (id: number) => {

    console.log("id", id);

    const response = await fetch(`/api/clientes/${id}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      setClientes(clientes.filter(cliente => cliente.id !== id)); // Actualiza el estado
    } else {
      alert("Error al eliminar el cliente.");
    }
  };  

  // Usamos useEffect para obtener los clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="space-y-6 p-6">
      {/* Inputs para nombre y email */}
      <div className="flex gap-4 items-center mb-4">
        <input
          type="text"
          placeholder="Nombre del cliente"
          className="px-4 py-2 border rounded-md"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="flex items-center gap-2" onClick={createCliente}>
          <IoAdd className="w-4 h-4" />
          Crear
        </Button>
      </div>

      {/* Tabla */}
      <Table className="border border-gray-200 rounded-lg shadow-sm mt-6">
        <TableCaption className="text-sm text-gray-500">
          Lista de clientes registrados.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <TableRow key={cliente.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{cliente.id}</TableCell>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{new Date(cliente.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                    <Button className="mr-2" variant="blue">
                    <IoEye className="w-4 h-4" />
                    </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteCliente(cliente.id)} // Llamada a la función deleteCliente
                  >
                    <IoTrash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No hay clientes registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
