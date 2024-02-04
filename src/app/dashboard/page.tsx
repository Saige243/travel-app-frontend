"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    if (response.ok) {
      const data = await response.json()
      setUser(data)
    } else {
      console.error("Failed to fetch user data", response)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the trip dashboard, {user?.first_name}!</p>
    </div>
  )
}

export default Dashboard
