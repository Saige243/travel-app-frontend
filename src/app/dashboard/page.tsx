"use client"

import React, { useEffect, useState } from "react"
import { useTripData } from "../_hooks/useTripData"
import { useFetchUser } from "../_hooks/useFetchUser"
import { Trip } from "../types"

function Dashboard() {
  const { soonestTrip, fetchSoonestTrip, isLoading, error } = useTripData()
  const { userData } = useFetchUser()

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
        </div>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  )
}

export default Dashboard
