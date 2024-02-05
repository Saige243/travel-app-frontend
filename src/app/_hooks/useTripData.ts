import { useState } from "react"
import { Trip } from "../types"

const BASE_URL = "http://localhost:3001/trips"

export function useTripData() {
  const [tripData, setTrips] = useState<Trip[]>([])
  const [trip, setTrip] = useState<Trip | null>(null)
  const [soonestTrip, setSoonestTrip] = useState<Trip | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setLoadingState = (isLoading: boolean) => {
    setIsLoading(isLoading)
    if (isLoading) setError(null)
  }

  const handleError = (error: unknown) => {
    console.error("An error occurred", error)
    setError(
      error instanceof Error ? error.message : "An unexpected error occurred"
    )
  }

  async function fetchTrips() {
    setLoadingState(true)
    try {
      const res = await fetch(BASE_URL, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch trips")
      const data: Trip[] = await res.json()
      setTrips(data)
    } catch (error) {
      handleError(error)
    } finally {
      setLoadingState(false)
    }
  }

  async function fetchTrip(id: number) {
    setLoadingState(true)
    try {
      const url = `${BASE_URL}/${id}`
      const res = await fetch(url, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch trip")
      const data: Trip = await res.json()
      setTrip(data)
    } catch (error) {
      handleError(error)
    } finally {
      setLoadingState(false)
    }
  }

  async function fetchSoonestTrip() {
    setLoadingState(true)
    try {
      const res = await fetch(BASE_URL, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to fetch trips")
      const data: Trip[] = await res.json()
      const soonestTrip = data
        .filter((trip) => new Date(trip.start_date) >= new Date())
        .sort((a, b) => +new Date(a.start_date) - +new Date(b.start_date))[0]
      setSoonestTrip(soonestTrip || null)
    } catch (error) {
      handleError(error)
    } finally {
      setLoadingState(false)
    }
  }

  return {
    tripData,
    fetchTrips,
    fetchTrip,
    trip,
    setTrip,
    soonestTrip,
    fetchSoonestTrip,
    isLoading,
    error,
  }
}
