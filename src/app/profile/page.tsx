"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useFetchUser } from "../_hooks/useFetchUser"

function Profile() {
  const router = useRouter()
  const { userData, isLoading } = useFetchUser()

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Profile</h1>
      {userData && !isLoading ? (
        <div className="space-y-2">
          <p>
            <span className="font-medium">First Name:</span>{" "}
            {userData.first_name}
          </p>
          <p>
            <span className="font-medium">Last Name:</span> {userData.last_name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {userData.email}
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
