"use client"

import React, { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTripData } from "../../_hooks/useTripData"
import { format, parseISO } from "date-fns"
import PackingListTable from "@/app/_components/PackingListTable"
import { ItineraryItem, Trip } from "@/app/types"
import ItineraryItems from "@/app/_components/IteneraryItems"
import { Button } from "@/app/_components/Button"

type ItemsGroupedByDate = Record<string, ItineraryItem[]>

function TripID() {
  const { id } = useParams()
  const router = useRouter()
  const { trip, fetchTrip } = useTripData()

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  function formatDate(dateString: string) {
    const date = parseISO(dateString)
    return format(date, "EEEE, MMMM d")
  }

  function formatTime(timeString: string) {
    const time = parseISO(timeString)
    return format(time, "hh:mm a")
  }

  const detailsBlock = (
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
            `${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}`}
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
  )

  const accomodationsBlock = (
    <>
      <h2 className="text-3xl font-bold py-4">Accommodations:</h2>
      {trip && trip.accommodations.length > 0 ? (
        trip.accommodations.map((accommodation, index) => (
          <div key={index} className="py-2 text-xl">
            <div className="pb-4">
              <h2 className="font-bold pr-4 underline pb-2">Where:</h2>
              <p>{accommodation.name}</p>
              <p>{accommodation.address}</p>
              <p className="text-blue-600">{accommodation.contact_number}</p>
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
            <Button
              text="Add accommodations"
              onClick={() => router.push(`${trip?.id}/accommodations/new`)}
            />
          </div>
        </div>
      )}
    </>
  )

  return (
    <div className="pt-12 md:pt-6 mx-auto max-w-5xl">
      <div className="text-center pb-8">
        <h1 className="text-5xl font-extrabold">My {trip?.title} Trip</h1>
        <p className="text-4xl font-extrabold">{trip?.location}</p>
      </div>

      <div className="flex justify-between">
        <div>{detailsBlock}</div>
        <div>{accomodationsBlock}</div>
      </div>
      <Button
        text="Edit trip details"
        onClick={() => router.push(`${trip?.id}/edit`)}
      />
      <div className="py-8">
        <PackingListTable trip={trip} />
      </div>

      <div>
        <h2 className="text-3xl font-bold py-4">Itenerary:</h2>
        <ItineraryItems
          itineraries={trip?.itinerary_items ?? []}
          trip={trip ?? undefined}
        />
      </div>
    </div>
  )
}

export default TripID
