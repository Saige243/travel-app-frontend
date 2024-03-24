"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "../types"
import { Button } from "@/app/_components/Button"

function ProfileEdit() {
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const router = useRouter()

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })

    if (response.ok) {
      const data: User = await response.json()
      setUser(data)
      setFormData({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
      })
    } else {
      console.error("Failed to fetch user data", response)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3001/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        user: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
        },
      }),
    })

    if (response.ok) {
      console.log("Profile updated successfully.")
      router.push("/profile") // Adjust if necessary to redirect user after update
    } else {
      console.error("Failed to update profile")
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Profile</h1>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-between mt-6">
            <Button text="Save Changes" type="submit" />
            <Button text="Cancel" onClick={() => router.back()} />
          </div>
        </form>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  )
}

export default ProfileEdit
