"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type Trip = {
  id: number
  title: string
  location: string
  start_date: string
  end_date: string
}

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
              {trip.title} - {trip.location} from {trip.start_date} to{" "}
              {trip.end_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>Looks like you have no trips planned!</p>
      )}
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/trips/new")}
      >
        Add a Trip
      </button>
    </div>
  )
}

export default Trips
