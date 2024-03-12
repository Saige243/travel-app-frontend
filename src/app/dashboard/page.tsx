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
    return format(date, "EEEE, MMMM d")
  }

  return (
    <div>
      <h1>Hi, {userData?.first_name}!</h1>
      {soonestTrip ? (
        <div>
          <p className="pb-8">Here&apos;s your upcoming trip:</p>
          <h2 className="text-xl font-bold pb-2">{soonestTrip.title}</h2>
          <p>{soonestTrip.location}</p>
          <div className="py-1">
            <span>{formatDate(soonestTrip.start_date)} - </span>
            <span>{formatDate(soonestTrip.end_date)}</span>
          </div>
          <button
            className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(`trips/${soonestTrip.id}`)}
          >
            Go to trip
          </button>
          <div className="py-12">
            <h2 className="pb-4">Want to add another?</h2>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/trips/new")}
            >
              Add a Trip
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>No trips found - add one below!</p>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 my-12 px-4 rounded"
            onClick={() => router.push("/trips/new")}
          >
            Add a Trip
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard
