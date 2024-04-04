"use client"

import "./globals.css"
import Navbar from "./_components/Navbar"
import React, { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthProvider, useAuth } from "./_contexts/AuthContext"
import { ThemeProvider } from "./_contexts/ThemeContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const path = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (path !== "/" && !isAuthenticated && !isLoading) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading])

  const mainBodyStyles =
    isAuthenticated && !isLoading
      ? "min-h-screen dark:bg-slate-700 pb-20"
      : "min-h-screen dark:bg-slate-700 "

  return (
    <AuthProvider>
      <ThemeProvider>
        <html lang="en">
          <body className={mainBodyStyles}>
            <Navbar />
            <main className="lg:px-20 xl:px-72">{children}</main>
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  )
}
