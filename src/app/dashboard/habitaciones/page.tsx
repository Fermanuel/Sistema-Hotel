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

export default function HabitacionesPage() {
  // Estado para los inputs de habitación
  const [numero, setNumero] = useState<number>(0);
  const [tipo, setTipo] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [descripcion, setDescripcion] = useState<string>("");
  
  // Estado para las habitaciones
  const [habitaciones, setHabitaciones] = useState<any[]>([]);
  
  // Estado para la habitación seleccionada
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState<any | null>(null);

  // Función para obtener las habitaciones
  const fetchHabitaciones = async () => {
    const response = await fetch("/api/habitaciones/obtener");
    if (response.ok) {
      const data = await response.json();
      setHabitaciones(data); // Actualiza el estado con las habitaciones obtenidas
    } else {
      alert("Error al obtener las habitaciones.");
    }
  };

  // Llamada a la API para crear una habitación
  const createHabitacion = async () => {
    const response = await fetch("/api/habitaciones/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numero, tipo, precio, descripcion }),
    });

    if (response.ok) {
      const nuevaHabitacion = await response.json();
      setHabitaciones([...habitaciones, nuevaHabitacion]); // Actualiza la lista de habitaciones con la nueva
    } else {
      alert("Error al crear la habitación.");
    }
  };

  // Llamada a la API para eliminar una habitación
  const deleteHabitacion = async (id: number) => {
    const response = await fetch(`/api/habitaciones/eliminar/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setHabitaciones(habitaciones.filter(habitacion => habitacion.id !== id)); // Actualiza el estado
    } else {
      alert("Error al eliminar la habitación.");
    }
  };

  // Función para seleccionar una habitación para editar
  const seleccionarHabitacion = (habitacion: any) => {
    setHabitacionSeleccionada(habitacion); // Establece la habitación seleccionada
    setNumero(habitacion.numero); // Carga los datos de la habitación en los inputs
    setTipo(habitacion.tipo);
    setPrecio(habitacion.precio);
    setDescripcion(habitacion.descripcion || "");
  };

  // Función para actualizar una habitación
  const actualizarHabitacion = async () => {
    if (!habitacionSeleccionada) return;

    const response = await fetch(`/api/habitaciones/actualizar/${habitacionSeleccionada.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numero, tipo, precio, descripcion }),
    });

    if (response.ok) {
      const habitacionActualizada = await response.json();
      // Actualiza la habitación en el estado
      setHabitaciones(habitaciones.map(habitacion => 
        habitacion.id === habitacionSeleccionada.id ? habitacionActualizada : habitacion
      ));
      // Limpia los inputs y deselecciona la habitación
      setNumero(0);
      setTipo("");
      setPrecio(0);
      setDescripcion("");
      setHabitacionSeleccionada(null);
    } else {
      alert("Error al actualizar la habitación.");
    }
  };

  // Usamos useEffect para obtener las habitaciones al montar el componente
  useEffect(() => {
    fetchHabitaciones();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="space-y-6 p-6">
      {/* Inputs para número, tipo, precio y descripción */}
      <div className="flex gap-4 items-center mb-4">
        <input
          type="number"
          placeholder="Número de habitación"
          className="px-4 py-2 border rounded-md"
          value={numero}
          onChange={(e) => setNumero(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Tipo de habitación"
          className="px-4 py-2 border rounded-md"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          className="px-4 py-2 border rounded-md"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Descripción"
          className="px-4 py-2 border rounded-md"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Button className="flex items-center gap-2" onClick={createHabitacion}>
          <IoAdd className="w-4 h-4" />
          Crear
        </Button>

        {/* Si una habitación está seleccionada, mostrar el botón de actualizar */}
        {habitacionSeleccionada && (
          <Button className="flex items-center gap-2" onClick={actualizarHabitacion}>
            <IoPencil className="w-4 h-4" />
            Actualizar
          </Button>
        )}
      </div>

      {/* Tabla */}
      <Table className="border border-gray-200 rounded-lg shadow-sm mt-6">
        <TableCaption className="text-sm text-gray-500">
          Lista de habitaciones registradas.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Fecha de Creación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {habitaciones.length > 0 ? (
            habitaciones.map((habitacion) => (
              <TableRow key={habitacion.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{habitacion.id}</TableCell>
                <TableCell>{habitacion.numero}</TableCell>
                <TableCell>{habitacion.tipo}</TableCell>
                <TableCell>${habitacion.precio}</TableCell>
                <TableCell>{habitacion.descripcion || "Sin descripción"}</TableCell>
                <TableCell>{new Date(habitacion.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button className="mr-2" variant="blue" onClick={() => seleccionarHabitacion(habitacion)}>
                    <IoPencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteHabitacion(habitacion.id)} // Llamada a la función deleteHabitacion
                  >
                    <IoTrash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No hay habitaciones registradas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
