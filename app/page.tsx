import Link from "next/link";
import {Button} from "@heroui/button";

export default function Home(){
    return (
        <div>
            <header>
                <div>
                    <h1>Sistema de Reservas de BRKLYN</h1>
                </div>
            </header>
            <main>
                <div>
                    <div>
                        <div>
                            <h2>Bienvenido a nuestro sistema de reservas</h2>
                            <p>Haz tu reserva desde la comodidad de tu hogar con solo unos pocos clicks</p>
                            <div>
                                <Button>
                                    <Link href="/reservations">Haz una reserva</Link>
                                </Button>
                                <Button variant="shadow">
                                    <Link href="/sign-up">Iniciar sesión</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}