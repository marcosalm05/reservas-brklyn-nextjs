'use client'

import Link from "next/link";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        // Verificar el estado de autenticación actual
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };
        
        getSession();

        // Escuchar cambios en la autenticación
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <header className="py-8 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
                        Sistema de Reservas de BRKLYN
                    </h1>
                </div>
            </header>
            <main className="py-12 px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                        <div className="text-center space-y-6">
                            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                                {user ? `Bienvenido, ${user.email}` : 'Bienvenido a nuestro sistema de reservas'}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600">
                                {user 
                                    ? 'Gestiona tus reservas desde tu panel personal'
                                    : 'Haz tu reserva desde la comodidad de tu hogar con solo unos pocos clicks'
                                }
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                {user ? (
                                    <>
                                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                                            <Link href="/reservations" className="w-full px-6 py-2">
                                                Mis Reservas
                                            </Link>
                                        </Button>
                                        <Button 
                                            variant="shadow" 
                                            className="w-full sm:w-auto border border-gray-300"
                                            onClick={handleSignOut}
                                        >
                                            <span className="w-full px-6 py-2">Cerrar Sesión</span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                                            <Link href="/auth/login" className="w-full px-6 py-2">
                                                Iniciar Sesión
                                            </Link>
                                        </Button>
                                        <Button variant="shadow" className="w-full sm:w-auto border border-gray-300">
                                            <Link href="/auth/signup" className="w-full px-6 py-2">
                                                Registrarse
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}