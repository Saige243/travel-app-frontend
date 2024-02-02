"use client"

import { useState } from "react"
import Login from "./_components/LoginForm"
import Signup from "./_components/SignupForm"

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true)

  const toggleView = () => setIsLoginView(!isLoginView)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      {isLoginView ? (
        <Login onSwitch={toggleView} />
      ) : (
        <Signup onSwitch={toggleView} />
      )}
    </main>
  )
}
