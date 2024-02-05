"use client"

import React, { useState, useEffect } from "react"
import { User } from "../types"

function Dashboard() {
  const [user, setUser] = useState<User | null>(null)

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
      <p>Here&apos;s your next trip:</p>

      <div></div>
    </div>
  )
}

export default Dashboard
