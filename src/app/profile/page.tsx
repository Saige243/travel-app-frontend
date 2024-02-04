"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
}

function Profile() {
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
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Profile</h1>
      {user ? (
        <div className="space-y-2">
          <p>
            <span className="font-medium">First Name:</span> {user.first_name}
          </p>
          <p>
            <span className="font-medium">Last Name:</span> {user.last_name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <div className="mt-4 space-x-2">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={() => router.push("/profile/edit")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default Profile
