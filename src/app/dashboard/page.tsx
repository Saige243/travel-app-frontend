"use client"

import React, { useEffect } from "react"
import { useTripData } from "../_hooks/useTripData"
import { useFetchUser } from "../_hooks/useFetchUser"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { Trip } from "../types"
import { Button } from "../_components/Button"
import toast, { Toaster } from "react-hot-toast"

function Dashboard() {
  const { soonestTrip, fetchSoonestTrip, isLoading, error } = useTripData()
  const { userData } = useFetchUser()
  const router = useRouter()

  useEffect(() => {
    fetchSoonestTrip()
  }, [])

  if (isLoading) return toast.loading("Loading...")
  if (error) return <div>Error: {error}</div>

  function formatDate(dateString: string) {
    const date = parseISO(dateString)
    return format(date, "EEEE, MMMM d")
  }

  const SoonestTripBlock = (soonestTrip: Trip) => (
    <>
      <p className="text-center text-3xl pt-4 pb-12">
        Here&apos;s your upcoming trip:
      </p>
      <div className="flex items-center flex-row bg-slate-50 rounded-md justify-between px-4 py-5 text-black">
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
          <Button
            text="Go to trip"
            onClick={() => router.push(`trips/${soonestTrip.id}`)}
          />
        </div>
      </div>
      <div className="py-12">
        <h2 className="pb-4">Want to add another?</h2>
        <Button text="Add a Trip" onClick={() => router.push("/trips/new")} />
      </div>
    </>
  )

  return (
    <div>
      <h1 className="text-center text-5xl">Hi, {userData?.first_name}!</h1>
      {soonestTrip ? (
        <SoonestTripBlock {...soonestTrip} />
      ) : (
        <div>
          <p>No trips found - add one below!</p>
          <Button text="Add a Trip" onClick={() => router.push("/trips/new")} />
        </div>
      )}
      <Toaster />
    </div>
  )
}

export default Dashboard
