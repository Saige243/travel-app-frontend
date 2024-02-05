import { useEffect, useState } from "react"
import { User } from "../types"

function useUserData() {
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

  return { fetchUserData, user }
}
