"use client"

import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Button } from "@heroui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"

export default function Page(){
    interface Reservation {
        id: string;
        fecha: string;
        clientes: {
            nombre: string;
            email: string;
        };
        mesas: {
            numero_mesa: number;
        };
        estado_reserva: {
            descripcion: string;
        };
    }
    
    const [reservations, setReservations] = useState<Reservation[]>([])

    useEffect(()=>{
        fetchReservations()
    }, [])
    const fetchReservations = async () => {
        const {data, error} = await supabase.from("reservas").select(`
        *,
        clientes (nombre, email),
        mesas (numero_mesa),
        estado_reserva (descripcion)
      `)
      if (error) console.log("Error fetching reservations", error);
      else setReservations(data);
    }

    const handleStatusChange = async (id:string, newStatus: number) => {
        const {error} = await supabase.from("reservas").update({estado_id: newStatus}).eq("id", id)
        if (error) console.log("Error updating reservations status", error) 
        else fetchReservations() 
    }
    return(
        <div>
            <h1>Panel de administrador</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Tabla</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reservations.map((reservation: any) => (
                        <TableRow key={reservation.id}>
                            <TableCell>{new Date(reservation.fecha).toLocaleString()}</TableCell>
                            <TableCell>{reservation.clientes.nombre}</TableCell>
                            <TableCell>{reservation.mesas.numero_mesa}</TableCell>
                            <TableCell>{reservation.estado_reserva.descripcion}</TableCell>
                            <TableCell>
                                <Button onClick={()=>{handleStatusChange(reservation.id, 1)}} variant="bordered">
                                    Confirmar
                                </Button>
                                <Button onClick={()=>{handleStatusChange(reservation.id, 2)}} variant="shadow">
                                    Cancelar
                                </Button>
                            </TableCell>
                        </TableRow>     
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
