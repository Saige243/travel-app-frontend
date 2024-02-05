import { useState, useEffect } from "react"
import { User } from "../types"

export const useFetchUser = () => {
  const [userData, setUserData] = useState<User>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://localhost:3001/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })

        if (response.ok) {
          const userData = await response.json()
          setUserData(userData)
        } else {
          throw new Error("Failed to fetch user data")
        }
      } catch (error: any) {
        console.error("Failed to fetch user data", error)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { userData, isLoading, error }
}
