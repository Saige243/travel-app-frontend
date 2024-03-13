"use client"

import "./globals.css"
import Navbar from "./_components/Navbar"
import { useState, useEffect } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getUser = async () => {
    try {
      const url = `http://localhost:3001/auth/logged_in`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Necessary for cookies if session-based authentication
      })

      if (!res.ok) {
        setIsAuthenticated(false)
        return
      }

      const data = await res.json()
      setIsAuthenticated(data.logged_in)
    } catch (error) {
      console.error("Failed to fetch authentication status", error)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <html lang="en">
      <body className="min-h-screen">
        {isAuthenticated && <Navbar />}
        <main className="lg:px-20 xl:px-72 lg:py-12">{children}</main>
      </body>
    </html>
  )
}
