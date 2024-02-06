"use client"

import React, { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Trip, PackingListItem } from "../../../types"
import { useTripData } from "../../../_hooks/useTripData"

function PackingListPage() {
  const router = useRouter()
  const { id } = useParams()
  const { trip, fetchTrip } = useTripData()

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold py-4 pb-8">
          Packing List for {trip?.title}
        </h2>
      </div>
      <div>
        <div className="flex justify-between items-center font-bold text-xl md:text-2xl py-4 border-b-2">
          <h2>Category</h2>
          <h2>Description</h2>
          <h2>Packed?</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {trip?.packing_list_items && trip.packing_list_items.length > 0 ? (
            trip.packing_list_items.map((item: PackingListItem) => (
              <li
                key={item.category}
                className="py-2 flex justify-between items-center text-lg"
              >
                <span>{item.category}</span>
                <span>{item.description}</span>
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => {}}
                />
              </li>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-xl">Your packing list is empty!</p>
              <button
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => router.push(`${trip?.id}/edit/packinglist`)}
              >
                Create packing list
              </button>
            </div>
          )}
        </ul>
        {trip?.packing_list_items && trip.packing_list_items.length > 0 && (
          <div className="flex space-x-4">
            <div className="pt-4">
              <button
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => router.back()}
              >
                Back to trip
              </button>
            </div>
            <div className="pt-4">
              <button
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => router.push(`edit/packinglist`)}
              >
                Edit packing list
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PackingListPage
