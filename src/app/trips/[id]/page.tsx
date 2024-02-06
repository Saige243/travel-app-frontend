"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTripData } from "../../_hooks/useTripData"
import { format, parseISO } from "date-fns"
import { PackingListItem } from "../../types"

function TripID() {
  const { id } = useParams()
  const router = useRouter()
  const { trip, fetchTrip } = useTripData()

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  function formatDate(dateString: string) {
    const date = parseISO(dateString)
    return format(date, "EEEE, MMMM d, yyyy")
  }

  console.log("trip", trip)

  return (
    <div>
      <div className="text-center pb-16">
        <h1 className="text-5xl font-extrabold">My {trip?.title} Trip</h1>
        <p className="text-4xl font-extrabold">{trip?.location}</p>
      </div>

      <div className="flex flex-col justify-between">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-bold text-center pb-4">Details:</h2>
          </div>

          <div className="py-2 text-xl">
            <span className="font-bold pr-4">Where:</span>
            <span>{trip?.location}</span>
          </div>

          <div className="py-2 text-xl justify-center">
            <span className="font-bold pr-4">When:</span>
            <span>
              {trip &&
                `${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}`}
            </span>
          </div>
          <div className="w-full place-items-center justify-center">
            <button
              className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => router.push(`${trip?.id}/edit`)}
            >
              Edit trip details
            </button>
          </div>
        </div>

        <div className="py-4">
          <div>
            <h2 className="text-2xl font-bold text-center py-4">
              Packing List:
            </h2>
          </div>
          <div>
            <ul>
              {trip?.packing_list_items ? (
                (trip.packing_list_items as PackingListItem[]).map(
                  (item: PackingListItem) => (
                    <li className="text-xl" key={item.category}>
                      <p>Category: {item.category}</p>
                      <p>Description: {item.description}</p>
                    </li>
                  )
                )
              ) : (
                <div>
                  <li className="text-xl">Your packing list is empty!</li>
                  <button
                    className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => router.push(`${trip?.id}/edit/packinglist`)}
                  >
                    Create packing list
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="text-2xl text-center font-bold pb-4">
          <h2>Itenerary</h2>
        </div>
      </div>
    </div>
  )
}

export default TripID
