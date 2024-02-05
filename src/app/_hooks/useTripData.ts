import { useState } from "react"

function useTripData() {
  const [tripData, setTrips] = useState(null)
  const [trip, setTrip] = useState(null)

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

  async function fetchTrip(id: number) {
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

  return { tripData, fetchTrips, fetchTrip, trip, setTrip }
}
