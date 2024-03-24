"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trip } from "../types"
import { Button } from "../_components/Button"

function Trips() {
  const [trips, setTrips] = useState([])
  const router = useRouter()

  async function fetchTrips() {
    const res = await fetch("http://localhost:3001/trips", {
      credentials: "include",
    })

    if (
      res.ok &&
      res.headers.get("Content-Type")?.includes("application/json")
    ) {
      const data = await res.json()
      setTrips(data)
    } else {
      console.error("Failed to fetch trips or the response is not JSON")
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  return (
    <div>
      <h1>My Trips</h1>
      {trips.length > 0 ? (
        <ul>
          {trips.map((trip: Trip) => (
            <li key={trip.id}>
              <p>
                {trip.title} - {trip.location} from {trip.start_date} to{" "}
              </p>
              <p>{trip.end_date}</p>
              <Button
                text="Go to trip"
                onClick={() => router.push(`trips/${trip.id}`)}
              />
              <Button
                text="Edit this trip"
                onClick={() => router.push(`trips/${trip.id}/edit`)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>Looks like you have no trips planned!</p>
      )}
      <Button text="Add a Trip" onClick={() => router.push("/trips/new")} />
    </div>
  )
}

export default Trips
