"use client"

import React, { useEffect } from "react"
import EditItineraryForm from "../../../../_components/EditItineraryForm"
import { useParams, useRouter } from "next/navigation"
import { useTripData } from "../../../../_hooks/useTripData"

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
      <button
        type="submit"
        className="mt-8 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={() => router.push(`/trips/${trip?.id}`)}
      >
        Back to trip
      </button>
    </div>
  )
}

export default ItineraryEditPage
