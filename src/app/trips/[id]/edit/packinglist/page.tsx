"use client"

import PackingList from "../../../../_components/PackingList"
import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTripData } from "../../../../_hooks/useTripData"

function EditPackingList() {
  const { id } = useParams()
  const { trip, fetchTrip } = useTripData()

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold text-center pb-8">
        Packing List for {trip?.title}
      </h1>
      <PackingList tripId={Number(id)} />
    </div>
  )
}

export default EditPackingList
