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
      <h1 className="text-center text-5xl">Hi, {userData?.first_name}!</h1>
      {soonestTrip && (
        <p className="text-center text-3xl py-8">
          Here&apos;s your upcoming trip:
        </p>
      )}
      {soonestTrip ? (
        <>
          <div className="flex items-center flex-row bg-slate-50 rounded-md justify-between px-4 py-5">
            <div>
              <h2 className="text-xl font-bold">{soonestTrip.title}</h2>
            </div>
            <div>
              <p>{soonestTrip.location}</p>
            </div>
            <div className="py-1">
              <span>{formatDate(soonestTrip.start_date)} - </span>
              <span>{formatDate(soonestTrip.end_date)}</span>
            </div>
            <div className="flex items-center text-center place-items-center content-center justify-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => router.push(`trips/${soonestTrip.id}`)}
              >
                Go to trip
              </button>
            </div>
          </div>
          <div className="py-12">
            <h2 className="pb-4">Want to add another?</h2>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/trips/new")}
            >
              Add a Trip
            </button>
          </div>
        </>
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
