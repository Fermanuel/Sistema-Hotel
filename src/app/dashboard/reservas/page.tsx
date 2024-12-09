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
import { IoAdd, IoTrash, IoCheckmarkCircleOutline } from "react-icons/io5";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from 'sonner';

export default function Reservaciones() {
  const [clienteId, setClienteId] = useState("");
  const [habitacionId, setHabitacionId] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin] = useState("");

  const [clientes, setClientes] = useState<any[]>([]);
  const [habitaciones, setHabitaciones] = useState<any[]>([]);
  const [reservaciones, setReservaciones] = useState<any[]>([]);

  const fetchClientes = async () => {
    const response = await fetch("/api/clientes/obtener");
    if (response.ok) {
      const data = await response.json();
      setClientes(data);
    } else {
      alert("Error al obtener los clientes.");
    }
  };

  const fetchHabitaciones = async () => {
    const response = await fetch("/api/habitaciones/obtener");
    if (response.ok) {
      const data = await response.json();
      setHabitaciones(data);
    } else {
      alert("Error al obtener las habitaciones.");
    }
  };

  const fetchReservaciones = async () => {
    const response = await fetch("/api/reservas/obtener");
    if (response.ok) {
      const data = await response.json();
      setReservaciones(data);
    } else {
      alert("Error al obtener las reservaciones.");
    }
  };

  const createReservacion = async () => {
    if (!clienteId || !habitacionId || !fechaInicio) {
      return toast.warning("Por favor completa todos los campos.");
    }

    // Cambiar el estado de la habitación a "reservada"
    const responseHabitacion = await fetch(`/api/habitaciones/actualizarEstado/${habitacionId}`, {
      method: "PUT",  // Usamos PUT porque estamos actualizando el estado
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: "reservada" }),  // Solo actualizamos el estado
    });

    if (!responseHabitacion.ok) {
      return toast.error("Error al actualizar la habitación.");
    }

    // Crear la reservación
    const response = await fetch("/api/reservas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clienteId,
        habitacionId,
        checkIn: fechaInicio,
        checkOut: fechaFin || null,
      }),
    });

    if (response.ok) {
      await fetchReservaciones();
      await fetchHabitaciones();
      toast.success("Reservación creada exitosamente.");
    } else {
      console.error("Error en la respuesta:", response.status);
    }
  };

  const deleteReservacion = async (id: number) => {
    const response = await fetch(`/api/reservas/eliminar/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setReservaciones(reservaciones.filter((reserva) => reserva.id !== id));
      toast.success("Reservación eliminada exitosamente.");
    } else {
      alert("Error al eliminar la reservación.");
    }
  };

  const finalizeReservacion = async (id: number) => {
    const fechaActual = new Date().toISOString(); // Obtener la fecha y hora actuales en formato ISO

    const response = await fetch(`/api/reservas/finalizar/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkOut: fechaActual, // Enviar la fecha actual
      }),
    });

    if (response.ok) {
      await fetchReservaciones(); // Refrescar las reservaciones
      await fetchHabitaciones();
      toast.success("Reservación finalizada exitosamente.");
    } else {
      alert("Error al finalizar la reservación.");
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchHabitaciones();
    fetchReservaciones();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <Toaster position="top-right" richColors />
      <div className="flex gap-4 items-center mb-4">
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

        <Select value={habitacionId} onValueChange={setHabitacionId}>
          <SelectTrigger className="px-4 py-2 border rounded-md">
            <SelectValue placeholder="Selecciona una Habitación" />
          </SelectTrigger>
          <SelectContent>
            {habitaciones.map((habitacion) => (
              <SelectItem
                key={habitacion.id}
                value={String(habitacion.id)}
                disabled={habitacion.estado !== "disponible"} // Deshabilitar si no está disponible
              >
                <div className="flex items-center justify-between">
                  <span>
                    {habitacion.numero} - {habitacion.tipo} - 
                  </span>
                  <Badge
                    className={`ml-2 ${habitacion.estado === "disponible"
                        ? "bg-green-500 text-white"
                        : habitacion.estado === "reservada"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-500 text-white"
                      }`}
                  >
                    {habitacion.estado}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <input
          type="datetime-local"
          className="px-4 py-2 border rounded-md"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <Button className="flex items-center gap-2" onClick={createReservacion}>
          <IoAdd className="w-4 h-4" />
          Crear
        </Button>
      </div>

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
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservaciones.length > 0 ? (
            reservaciones.map((reserva) => (
              <TableRow key={reserva.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{reserva.id}</TableCell>
                <TableCell>
                  {reserva.cliente ? reserva.cliente.nombre : "Cliente no encontrado"}
                </TableCell>
                <TableCell>
                  {reserva.habitacion ? reserva.habitacion.numero : "Habitación no disponible"}
                </TableCell>
                <TableCell>{new Date(reserva.checkIn).toLocaleString()}</TableCell>
                <TableCell>
                  {reserva.checkOut ? (
                    new Date(reserva.checkOut).toLocaleString()
                  ) : (
                    <Badge variant="success">
                      Activa
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {reserva.finalizada ? (
                    <Badge variant="warning">Finalizada</Badge>
                  ) : (
                    <Button variant="blue" onClick={() => finalizeReservacion(reserva.id)}>
                      <IoCheckmarkCircleOutline className="w-4 h-4" />
                    </Button>
                  )}
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
              <TableCell colSpan={7} className="text-center">
                No hay reservaciones.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}