"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import {Label} from "@radix-ui/react-label"

export default function Login() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const router = useRouter()

const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if (error) throw error
        router.push("/")
    } catch (error) {
        console.error("Error logging in:", error)
    }
}
return (
    <div>
        <div>
            <h1>Inicio de Sesión</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" value={email} onChange={(e)=>{
                        setEmail(e.target.value)
                    }} required />
                </div>
                <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <Button type="submit">Iniciar sesión</Button>
            </form>
        </div>
    </div>
)
}