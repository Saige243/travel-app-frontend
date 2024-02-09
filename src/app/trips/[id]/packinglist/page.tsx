"use client"

import React, { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Trip, PackingListItem } from "../../../types"
import { useTripData } from "../../../_hooks/useTripData"

function PackingListPage() {
  const router = useRouter()
  const { id } = useParams()
  const tripId = parseInt(id as string)
  const { trip, fetchTrip } = useTripData()
  const [packingListItems, setPackingListItems] = React.useState<
    PackingListItem[]
  >([])

  useEffect(() => {
    fetchTrip(id as string)
  }, [packingListItems])

  useEffect(() => {
    if (trip?.packing_list_items) {
      setPackingListItems(trip.packing_list_items)
    }
  }, [trip])

  const handleUpdatePackedStatus = async (item: PackingListItem) => {
    const optimisticUpdatedItems = packingListItems.map((i) =>
      i.id === item.id ? { ...i, packed: !i.packed } : i
    )
    setPackingListItems(optimisticUpdatedItems)

    try {
      const url = `http://localhost:3001/trips/${tripId}/packing_list_items/${item.id}`
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ packed: !item.packed }),
      })

      if (!response.ok) throw new Error("Network response was not ok.")

      console.log("Item updated successfully", await response.json())
    } catch (error) {
      console.error("Failed to update item", error)
      setPackingListItems(
        packingListItems.map((i) =>
          i.id === item.id ? { ...i, packed: item.packed } : i
        )
      )

      alert("Failed to update the packing status. Please try again.")
    }
  }

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
        <ol className="divide-y divide-gray-400 list-decimal">
          {trip?.packing_list_items && trip.packing_list_items.length > 0 ? (
            trip.packing_list_items.map((item: PackingListItem) => (
              <li
                key={item.id}
                className="py-2 grid grid-cols-3 justify-center items-center text-lg"
              >
                <span className={`px-2 ${item.packed ? "line-through" : ""}`}>
                  {item.category}
                </span>
                <span className={`px-2 ${item.packed ? "line-through" : ""}`}>
                  {item.description}
                </span>
                <div className="col-start-3 col-end-4 text-right pr-4">
                  <input
                    type="checkbox"
                    checked={item.packed ?? false}
                    onChange={() => handleUpdatePackedStatus(item)}
                  />
                </div>
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
        </ol>
        {trip?.packing_list_items && trip.packing_list_items.length > 0 && (
          <div className="flex space-x-4">
            <div className="pt-4">
              <button
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => router.push(`/trips/${tripId}`)}
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
