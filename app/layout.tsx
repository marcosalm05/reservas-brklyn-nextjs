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
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-gradient-to-b from-gray-50 to-gray-100`}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-gray-900">
                  BRKLYN
                </a>
              </div>
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <a href="/reservations" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Reservas
                </a>
                <a href="/auth/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Iniciar Sesión
                </a>
                <a href="/auth/signup" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Registrarse
                </a>
              </div>
              {/* Menú móvil */}
              <div className="flex items-center sm:hidden">
                <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Abrir menú principal</span>
                  {/* Icono de menú hamburguesa */}
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Panel móvil */}
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/reservations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Reservas
              </a>
              <a href="/auth/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Iniciar Sesión
              </a>
              <a href="/auth/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Registrarse
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>

        <footer className="bg-white shadow-sm mt-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} BRKLYN. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}