"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import EditAccommodationsForm from "../../../_components/EditAccommodationsForm"
import EditDetailsForm from "../../../_components/EditDetailsForm"
import { useTripData } from "../../../_hooks/useTripData"
import { Button } from "@/app/_components/Button"

function EditTrip() {
  const { id } = useParams()
  const router = useRouter()
  const { trip, fetchTrip } = useTripData()

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  return (
    <div className="flex flex-col px-8 lg:px-36">
      <h1 className="text-4xl font-bold mb-8">Edit {trip?.title}</h1>
      <EditDetailsForm trip={trip} />
      <EditAccommodationsForm trip={trip} />
      <div>
        <Button
          text="Back to trip"
          onClick={() => router.push(`/trips/${id}`)}
        />
      </div>
    </div>
  )
}

export default EditTrip
