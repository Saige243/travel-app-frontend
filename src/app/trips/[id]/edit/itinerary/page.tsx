"use client"

import React, { useEffect } from "react"
import EditItineraryForm from "../../../../_components/EditItineraryForm"
import { useParams, useRouter } from "next/navigation"
import { useTripData } from "../../../../_hooks/useTripData"
import { Button } from "@/app/_components/Button"

function ItineraryEditPage() {
  const { trip, fetchTrip } = useTripData()
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  return (
    <div>
      <EditItineraryForm trip={trip} />
      <Button
        type="submit"
        text="Back to trip"
        onClick={() => router.push(`/trips/${trip?.id}`)}
      />
    </div>
  )
}

export default ItineraryEditPage
