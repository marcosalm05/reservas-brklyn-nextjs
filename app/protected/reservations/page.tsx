"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@heroui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@heroui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }  from "@radix-ui/react-select"

export default function Reservations() {
    
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [guests, setGuests] = useState("1")
    const [mesas, setMesas] = useState<any[]>([])
    const [selectedMesa, setSelectedMesa] = useState("")

    useEffect(()=>{
        fetchMesas()
    }, [])

    const fetchMesas = async () => {
        const {data, error} = await supabase.from("mesas").select("*").eq("estado", "Disponible")
        if(error) console.error("Error fetching mesas:", error)
        else setMesas(data)
    }

    const assignMesa = async () => {
        const { data, error } = await supabase
            .from("mesas")
            .select("id")
            .eq("estado", "Disponible")
            .gte("capacidad", parseInt(guests))
            .limit(1);
    
        if (error) throw error;
        if (!data || data.length === 0) throw new Error("No hay mesas disponibles");
    
        return data[0].id;
    };

    const handleReservation = async (e: React.FormEvent) => {
        e.preventDefault()
        const selectedDateTime = new Date(`${date}T${time}`)
        if (selectedDateTime < new Date()){
            console.error("La fecha y hora deben ser futuras.")
            return
        }
        //Obs: agregar validación para que no se reserven mesas en fechas futuras tan lejanas en el tiempo. Por ejemplo, no se pueden reservar mesas para dentro de 1 año.
        //if (selectedDateTime > new Date(new Date().setFullYear(new Date().getFullYear()))){
         //   console.error("La fecha y hora deben estar en un rango comprendido de menos de un año.")
         //   return
        //}

        try {
            const {data: {user},} = await supabase.auth.getUser()
            if(!user) throw new Error("User not authenticated") 
                const { data, error } = await supabase.from("reservas").insert({
                    fecha: `${date}T${time}`,
                    cliente_id: user.id,
                    mesa_id:selectedMesa,
                    estado_id: 2,
                    sucursal: "1" //Se asume sucursal principal
                })
        if (error) {
    console.error("Error al crear la reserva:", error.message);
    alert(`Error: ${error.message}`);
}
        } catch (error) {
            console.error("Error creating reservation:", error)
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Hacer una reserva</h1>
        <form onSubmit={handleReservation} className="space-y-4">
          <div>
            <Label htmlFor="date" className="block text-sm font-medium">Fecha</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full mt-1" />
          </div>
          <div>
            <Label htmlFor="time" className="block text-sm font-medium">Hora</Label>
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="w-full mt-1" />
          </div>
          <div>
            <Label htmlFor="guests" className="block text-sm font-medium">Número de Invitados</Label>
            <Input 
              id="guests" 
              type="number" 
              min="1" 
              max="10" 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)} 
              required 
              className="w-full mt-1"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg">
            Reservar
          </Button>
          </form>
          </div>
    )
}
