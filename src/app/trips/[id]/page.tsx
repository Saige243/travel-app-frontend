"use client"

import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Trip } from "../../types"

function TripID() {
  const { id } = useParams()
  const [trip, setTrip] = useState<Trip | null>()

  async function fetchTrip() {
    const tripId = id
    const url = `http://localhost:3001/trips/${tripId}`
    const res = await fetch(url, { credentials: "include" })

    if (
      res.ok &&
      res.headers.get("Content-Type")?.includes("application/json")
    ) {
      const data = await res.json()
      setTrip(data)
    } else {
      console.error("Failed to fetch trips or the response is not JSON")
    }
  }

  useEffect(() => {
    fetchTrip()
  }, [])

  return (
    <>
      {!trip ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>My {trip.title} Trip</h1>
          <p>Location: {trip.location}</p>
          <p>Start Date: {trip.start_date}</p>
          <p>End Date: {trip.end_date}</p>
        </div>
      )}
    </>
  )
}

export default TripID
