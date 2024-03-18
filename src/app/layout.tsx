"use client"

import "./globals.css"
import Navbar from "./_components/Navbar"
import React, { createContext, useState, useContext, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
}

const defaultContextValue: AuthContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const getUser = async () => {
    try {
      const url = `http://localhost:3001/auth/logged_in`
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated } as any}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="min-h-screen dark:bg-slate-700">
          <Navbar />
          <main className="lg:px-20 xl:px-72 ">{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
