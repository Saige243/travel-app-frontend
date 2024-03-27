"use client"

import "./globals.css"
import Navbar from "./_components/Navbar"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "./_contexts/AuthContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push("/")
  //   }
  // }, [isAuthenticated])

  const mainBodyStyles =
    isAuthenticated && !isLoading
      ? "min-h-screen dark:bg-slate-700 pb-20"
      : "min-h-screen dark:bg-slate-700 "

  return (
    <AuthProvider>
      <html lang="en">
        <body className={mainBodyStyles}>
          <Navbar />
          <main className="lg:px-20 xl:px-72">{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
