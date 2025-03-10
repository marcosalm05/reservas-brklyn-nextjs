import type React from "react";
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({subsets: ["latin"]})

export const metadata = {
  title: "Sistema de Reservas para Restaurantes",
  description: "Gestiona tus reservas de manera fácil y rápida"
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}