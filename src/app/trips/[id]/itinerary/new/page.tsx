"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import IteneraryItemForm from "../../../../_components/IteneraryItemForm"
import { useTripData } from "../../../../_hooks/useTripData"

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
      <button
        type="button"
        onClick={() => router.push(`/trips/${tripId}`)}
        className="mt-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to trip
      </button>
    </div>
  )
}

export default AddItineraryItemForm
