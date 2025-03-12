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

    const handleReservation = async (e: React.FormEvent) => {
        e.preventDefault()
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
        if(error) throw error
        } catch (error) {
            console.error("Error creating reservation:", error)
        }
    }
    return (
        <div>
            <div>
                <h1>Hacer una reserva</h1>
                <form onSubmit={handleReservation}>
                    <div>
                        <Label htmlFor="date">Fecha</Label>
                        <Input id="date" type="date" value={date} onChange={(e)=>{setDate(e.target.value)}} required />
                    </div>
                    <div>
                        <Label htmlFor="time">Hora</Label>
                        <Input id="time" type="time" value={time} onChange={(e)=>{setTime(e.target.value)}} required />
                    </div>
                    <div>
                        <Label htmlFor="guests">Número de Invitados</Label>
                        <Input 
                        id="guests" 
                        type="number" 
                        min="1" 
                        max="10"
                        value={guests}
                        onChange={(e)=>{setGuests(e.target.value)}} 
                        required
                        />
                    </div>
                    <div>
                        <Label htmlFor="mesa">Mesa</Label>
                        <Select onValueChange={setSelectedMesa} value={selectedMesa}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una mesa" />
                            </SelectTrigger>
                            <SelectContent>
                                {mesas.map((mesa:any)=>(
                                    <SelectItem key={mesa.id} value={mesa.id.toString()}>
                                        Mesa {mesa.numero_mesa} (Capacidad: {mesa.capacidad})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit">Reservar</Button>
                </form>
            </div>
        </div>
    )
}
