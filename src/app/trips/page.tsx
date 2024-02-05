"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trip } from "../types"

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
              <button
                className="bg-blue-700 mr-2 hover:bg-blue-800 text-white font-bold py-2 mt-2 px-4 rounded"
                onClick={() => router.push(`trips/${trip.id}`)}
              >
                Go to trip
              </button>
              <button
                onClick={() => router.push(`trips/${trip.id}/edit`)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 mt-2 px-4 rounded"
              >
                Edit this trip
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Looks like you have no trips planned!</p>
      )}
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 my-12 px-4 rounded"
        onClick={() => router.push("/trips/new")}
      >
        Add a Trip
      </button>
    </div>
  )
}

export default Trips
