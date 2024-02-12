"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTripData } from "../../_hooks/useTripData"
import { format, parseISO } from "date-fns"
import PackingListTable from "@/app/_components/PackingListTable"
import ItineraryItemForm from "../../_components/IteneraryItemForm"

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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center pb-8">
        <h1 className="text-5xl font-extrabold">My {trip?.title} Trip</h1>
        <p className="text-4xl font-extrabold">{trip?.location}</p>
      </div>

      <div className="justify-between">
        <div className="px-4 lg:px-0 md:flex md:justify-between">
          <div className="py-8">
            <div>
              <h2 className="text-3xl font-bold pb-4">Details:</h2>
            </div>

            <div className="py-2 text-xl">
              <p className="font-bold pr-4 underline pb-2">Destination:</p>
              <p className="text-md">{trip?.location}</p>
            </div>

            <div className="py-2 text-xl justify-center">
              <p className="font-bold pr-4 underline pb-2">When:</p>
              <p>
                {trip &&
                  `${formatDate(trip.start_date)} - ${formatDate(
                    trip.end_date
                  )}`}
              </p>
            </div>
            <div className="py-2 text-xl justify-center">
              <p className="font-bold pr-4 underline pb-2">Description:</p>
              <p>
                {trip && trip?.description !== undefined
                  ? trip?.description
                  : "No description provided"}
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold py-4">Accommodations:</h2>
            {trip && trip.accommodations.length > 0 ? (
              trip.accommodations.map((accommodation, index) => (
                <div key={index} className="py-2 text-xl">
                  <div className="pb-4">
                    <h2 className="font-bold pr-4 underline pb-2">Where:</h2>
                    <p>{accommodation.name}</p>
                    <p>{accommodation.address}</p>
                    <p className="text-blue-600">
                      {accommodation.contact_number}
                    </p>
                  </div>
                  <div className="pb-4">
                    <h2 className="font-bold underline pb-2">Check In:</h2>
                    <span>{formatDate(accommodation.check_in_date)}</span>
                  </div>
                  <div className="pb-4">
                    <h2 className="font-bold underline pb-2">Check Out:</h2>
                    <span>{formatDate(accommodation.check_out_date)}</span>
                  </div>
                  <div className="pb-4">
                    <h2 className="font-bold underline pb-2">Notes:</h2>
                    <p>{accommodation.notes}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6">
                <div className="text-center py-6">
                  <p className="text-xl">You have no accommodations!</p>
                  <button
                    className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() =>
                      router.push(`${trip?.id}/accommodations/new`)
                    }
                  >
                    Add accommodations
                  </button>
                </div>
                <button
                  className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  onClick={() => router.push(`${trip?.id}/edit`)}
                >
                  Edit trip details
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="px-4 mt-8 py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          onClick={() => router.push(`${trip?.id}/edit`)}
        >
          Edit trip details
        </button>
        <div className="py-8">
          <PackingListTable trip={trip} />
          {/* <ItineraryItemForm trip={trip} /> */}
        </div>
        <div>
          <h2 className="text-3xl font-bold py-4">Itenerary:</h2>
          {trip?.itinerary_items && trip?.itinerary_items.length > 0 ? (
            trip?.itinerary_items.map((item, index) => (
              <div key={index} className="border p-4 rounded shadow space-y-2">
                <h2 className="font-bold underline pb-2">Title:</h2>
                <p>{item.title}</p>
                <h2 className="font-bold underline pb-2">Description:</h2>
                <p>{item.description}</p>
                <h2 className="font-bold underline pb-2">Time:</h2>
                <p>{item.time}</p>
                <h2 className="font-bold underline pb-2">Date:</h2>
                <p>{formatDate(item.date)}</p>
                <h2 className="font-bold underline pb-2">Location:</h2>
                <p>{item.location}</p>
              </div>
            ))
          ) : (
            <div className="py-6">
              <div className="text-center py-6">
                <p className="text-xl">You have no itinerary items!</p>
                <button
                  className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => router.push(`${trip?.id}/itinerary/new`)}
                >
                  Add itinerary items
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TripID
