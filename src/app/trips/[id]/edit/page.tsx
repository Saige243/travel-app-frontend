"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import EditAccommodationsForm from "../../../_components/EditAccommodationsForm"
import EditDetailsForm from "../../../_components/EditDetailsForm"
import { useTripData } from "../../../_hooks/useTripData"

function EditTrip() {
  const { id } = useParams()
  const router = useRouter()
  const { trip, fetchTrip } = useTripData()

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Edit {trip?.title}</h1>
      <EditDetailsForm trip={trip} />
      <EditAccommodationsForm trip={trip} />
      <div>
        <button
          onClick={() => router.push(`/trips/${id}`)}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 my-12 px-4 rounded"
        >
          Back to trip
        </button>
      </div>
    </>
  )
}

export default EditTrip
