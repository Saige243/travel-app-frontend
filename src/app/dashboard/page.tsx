"use client"

import React, { useEffect, useState } from "react"
import { useTripData } from "../_hooks/useTripData"
import { useFetchUser } from "../_hooks/useFetchUser"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"

function Dashboard() {
  const { soonestTrip, fetchSoonestTrip, isLoading, error } = useTripData()
  const { userData } = useFetchUser()
  const router = useRouter()

  useEffect(() => {
    fetchSoonestTrip()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  function formatDate(dateString: string) {
    const date = parseISO(dateString)
    return format(date, "EEEE, MMMM d, yyyy")
  }

  return (
    <div>
      <h1>Hi, {userData?.first_name}!</h1>
      <p className="pb-8">Here&apos;s your upcoming trip:</p>
      {soonestTrip ? (
        <div>
          <h2 className="text-xl font-bold pb-2">{soonestTrip.title}</h2>
          <p>{soonestTrip.location}</p>
          <p>{formatDate(soonestTrip.start_date)}</p>
          <p>{formatDate(soonestTrip.end_date)}</p>
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
