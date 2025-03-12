'use client'

import React, { use } from "react";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import {Label} from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const router = useRouter()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
           const {data, error} = await supabase.auth.signUp({
            email,
            password
           }) 
           if (error) throw error

           const {error: ClientError} = await supabase
              .from("clientes")
              .insert(
                { id: data.user?.id, nombre: name, email, telefono: phone }
              )
              if (ClientError) throw ClientError

              router.push("/auth/login")
        } catch (error) {
            console.error("Error signing up:", error)
        }
    }
    return(
        <div>
            <div>
                <h1>Registrarse</h1>
                <form onSubmit={handleSignUp}>
                    <div>
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" type="name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input id="phone" type="tel" value={phone} onChange={(e)=>{setPhone(e.target.value)}} required/>
                    </div>
                    <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e)=>{setPhone(e.target.value)}} required/>
                    </div>
                    <div>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    <Button type="submit" className="w-full">
                    Registrarse
                    </Button>
                </form>
            </div>
        </div>
    )
}