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
import { IoAdd, IoTrash } from "react-icons/io5";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Reservaciones() {
  // Estados para los datos de la reservación
  const [clienteId, setClienteId] = useState("");
  const [habitacionId, setHabitacionId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // Estado para los clientes y las habitaciones
  const [clientes, setClientes] = useState<any[]>([]);
  const [habitaciones, setHabitaciones] = useState<any[]>([]);
  const [reservaciones, setReservaciones] = useState<any[]>([]);

  // Función para obtener los clientes
  const fetchClientes = async () => {
    const response = await fetch("/api/clientes/obtener");
    if (response.ok) {
      const data = await response.json();
      setClientes(data);
    } else {
      alert("Error al obtener los clientes.");
    }
  };

  // Función para obtener las habitaciones
  const fetchHabitaciones = async () => {
    const response = await fetch("/api/habitaciones/obtener");
    if (response.ok) {
      const data = await response.json();
      setHabitaciones(data);
    } else {
      alert("Error al obtener las habitaciones.");
    }
  };

  // Función para obtener las reservaciones
  const fetchReservaciones = async () => {
    const response = await fetch("/api/reservas/obtener");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setReservaciones(data);
    } else {
      alert("Error al obtener las reservaciones.");
    }
  };

  // Función para crear una nueva reservación
  const createReservacion = async () => {
    const response = await fetch("/api/reservas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clienteId,
        habitacionId,
        checkIn: fechaInicio,
        checkOut: fechaFin || null, // Envía null si fechaFin está vacío
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } else {
      console.error("Error en la respuesta:", response.status);
    }
  };
   

  // Función para eliminar una reservación
  const deleteReservacion = async (id: number) => {
    const response = await fetch(`/api/reservas/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setReservaciones(reservaciones.filter((reserva) => reserva.id !== id));
    } else {
      alert("Error al eliminar la reservación.");
    }
  };

  // Usamos useEffect para obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchClientes();
    fetchHabitaciones();
    fetchReservaciones();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Formulario para agregar una nueva reservación */}
      <div className="flex gap-4 items-center mb-4">
        {/* Select para Cliente */}
        <Select value={clienteId} onValueChange={setClienteId}>
          <SelectTrigger className="px-4 py-2 border rounded-md">
            <SelectValue placeholder="Selecciona un Cliente" />
          </SelectTrigger>
          <SelectContent>
            {clientes.map((cliente) => (
              <SelectItem key={cliente.id} value={String(cliente.id)}>
                {cliente.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Select para Habitación */}
        <Select value={habitacionId} onValueChange={setHabitacionId}>
          <SelectTrigger className="px-4 py-2 border rounded-md">
            <SelectValue placeholder="Selecciona una Habitación" />
          </SelectTrigger>
          <SelectContent>
            {habitaciones.map((habitacion) => (
              <SelectItem key={habitacion.id} value={String(habitacion.id)}>
                {habitacion.numero}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Fechas de la reservación */}
        <input
          type="datetime-local"
          className="px-4 py-2 border rounded-md"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <input
          type="datetime-local"
          className="px-4 py-2 border rounded-md"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <Button className="flex items-center gap-2" onClick={createReservacion}>
          <IoAdd className="w-4 h-4" />
          Crear
        </Button>
      </div>

      {/* Tabla de Reservaciones */}
      <Table className="border border-gray-200 rounded-lg shadow-sm mt-6">
        <TableCaption className="text-sm text-gray-500">
          Lista de Reservaciones
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Habitación</TableHead>
            <TableHead>Fecha de Inicio</TableHead>
            <TableHead>Fecha de Fin</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservaciones.length > 0 ? (
            reservaciones.map((reserva) => (
              <TableRow key={reserva.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{reserva.id}</TableCell>
                {/* Verifica si cliente existe antes de acceder a su nombre */}
                <TableCell>{reserva.cliente ? reserva.cliente.nombre : "Cliente no encontrado"}</TableCell>
                {/* Verifica si habitacion existe antes de acceder a su número */}
                <TableCell>{reserva.habitacion ? reserva.habitacion.numero : "Habitación no disponible"}</TableCell>
                <TableCell>{new Date(reserva.checkIn).toLocaleString()}</TableCell>
                <TableCell>
                  {reserva.checkOut
                    ? new Date(reserva.checkOut).toLocaleString()
                    : "Reservación activa"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    onClick={() => deleteReservacion(reserva.id)}
                  >
                    <IoTrash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No hay reservaciones.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
