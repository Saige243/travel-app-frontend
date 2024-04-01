"use client"

import React, { createContext, useState, useContext, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  setIsAuthenticated: (value: boolean) => void
}

const defaultContextValue: AuthContextType = {
  isLoading: true,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch authentication status", error)
      setIsAuthenticated(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading } as any}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
