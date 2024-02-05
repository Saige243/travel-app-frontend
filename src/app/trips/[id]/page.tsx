"use client"

import React, { useEffect } from "react"
import { useParams } from "next/navigation"
import { useTripData } from "../../_hooks/useTripData"

function TripID() {
  const { id } = useParams()
  const { trip, fetchTrip } = useTripData()

  useEffect(() => {
    fetchTrip(id as string)
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
