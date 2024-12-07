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
import { constants } from "buffer";
import { IoAdd, IoEye, IoPencil, IoTrash } from "react-icons/io5";


// Simulación de datos (deberían venir de la base de datos en producción)
const clientes = [
  { id: 1, nombre: "Juan Pérez", email: "juan.perez@example.com", createdAt: new Date() },
  { id: 2, nombre: "María García", email: "maria.garcia@example.com", createdAt: new Date() },
  { id: 3, nombre: "Carlos López", email: "carlos.lopez@example.com", createdAt: new Date() },
];

export default function Page() {

  return (
    <div className="space-y-6 p-6">
      {/* Botones con Iconos */}
      <div className="flex justify-end gap-2.5">
        <Button className="flex items-center gap-2">
          <IoAdd className="w-4 h-4" />
          Create
        </Button>
        <Button className="flex items-center gap-2">
          <IoEye className="w-4 h-4" />
          Read
        </Button>
        <Button className="flex items-center gap-2">
          <IoPencil className="w-4 h-4" />
          Update
        </Button>
        <Button variant="destructive" className="flex items-center gap-2">
          <IoTrash className="w-4 h-4" />
          Delete
        </Button>
      </div>

      {/* Tabla */}
      <Table className="border border-gray-200 rounded-lg shadow-sm">
        <TableCaption className="text-sm text-gray-500">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>
              <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                Paid
              </span>
            </TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium">INV002</TableCell>
            <TableCell>
              <span className="px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded">
                Pending
              </span>
            </TableCell>
            <TableCell>PayPal</TableCell>
            <TableCell className="text-right">$125.00</TableCell>
          </TableRow>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium">INV003</TableCell>
            <TableCell>
              <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                Overdue
              </span>
            </TableCell>
            <TableCell>Bank Transfer</TableCell>
            <TableCell className="text-right">$300.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
