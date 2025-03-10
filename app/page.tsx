import Link from "next/link";
import {Button} from "@heroui/button";

export default function Home(){
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
                                Bienvenido a nuestro sistema de reservas
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600">
                                Haz tu reserva desde la comodidad de tu hogar con solo unos pocos clicks
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                                    <Link href="/reservations" className="w-full px-6 py-2">
                                        Haz una reserva
                                    </Link>
                                </Button>
                                <Button variant="shadow" className="w-full sm:w-auto border border-gray-300">
                                    <Link href="/auth/login" className="w-full px-6 py-2">
                                        Iniciar sesión
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}