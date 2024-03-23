"use client"

import { useState, useEffect } from "react"
import Login from "./_components/LoginForm"
import Signup from "./_components/SignupForm"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/layout"

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated])

  const toggleView = () => setIsLoginView(!isLoginView)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      {isLoginView ? (
        <Login onSwitch={toggleView} />
      ) : (
        <Signup onSwitch={toggleView} />
      )}
    </main>
  )
}
