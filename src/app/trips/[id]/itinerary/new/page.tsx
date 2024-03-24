"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import IteneraryItemForm from "../../../../_components/IteneraryItemForm"
import { useTripData } from "../../../../_hooks/useTripData"
import { Button } from "@/app/_components/Button"

function AddItineraryItemForm() {
  const { trip, fetchTrip } = useTripData()
  const { id } = useParams()
  const router = useRouter()
  const tripId = Array.isArray(id) ? id[0] : (id as string)

  useEffect(() => {
    fetchTrip(tripId)
  }, [])

  return (
    <div>
      <IteneraryItemForm trip={trip} />
      <Button
        text="Back to trip"
        onClick={() => router.push(`/trips/${tripId}`)}
      />
    </div>
  )
}

export default AddItineraryItemForm
