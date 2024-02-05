"use client"

import React, { useEffect, useState } from "react"
import { useTripData } from "../_hooks/useTripData"
import { useFetchUser } from "../_hooks/useFetchUser"
import { useRouter } from "next/navigation"

function Dashboard() {
  const { soonestTrip, fetchSoonestTrip, isLoading, error } = useTripData()
  const { userData } = useFetchUser()
  const router = useRouter()

  useEffect(() => {
    fetchSoonestTrip()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Hi, {userData?.first_name}!</h1>
      <p className="pb-8">Here&apos;s your upcoming trip:</p>
      {soonestTrip ? (
        <div>
          <p>{soonestTrip.title}</p>
          <p>{soonestTrip.location}</p>
          <p>{soonestTrip.start_date}</p>
          <p>{soonestTrip.end_date}</p>
          <button
            className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(`trips/${soonestTrip.id}`)}
          >
            Go to trip
          </button>
        </div>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  )
}

export default Dashboard
