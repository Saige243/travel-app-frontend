"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Trip, PackingListItem } from "../../../types"
import { useTripData } from "../../../_hooks/useTripData"

function PackingListPage() {
  const router = useRouter()
  const { id } = useParams()
  const tripId = parseInt(id as string)
  const { trip, fetchTrip } = useTripData()
  const [packingListItems, setPackingListItems] = useState<PackingListItem[]>(
    []
  )
  const [filterCategory, setFilterCategory] = useState("ALL")
  const [filterPacked, setFilterPacked] = useState("ALL")

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

  const filteredItems = packingListItems.filter((item) => {
    const categoryMatch =
      filterCategory === "ALL" || item.category === filterCategory
    const packedMatch =
      filterPacked === "ALL" ||
      (filterPacked === "PACKED" && item.packed) ||
      (filterPacked === "UNPACKED" && !item.packed)
    return categoryMatch && packedMatch
  })

  return (
    <div>
      <h2 className="text-3xl font-bold py-4 pb-8">
        Packing List for {trip?.title}
      </h2>
      <div className="mb-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="mb-4 mr-4 p-1 roumd"
        >
          <option value="ALL">Filter by Category</option>
          {Array.from(
            new Set(packingListItems.map((item) => item.category))
          ).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filterPacked}
          onChange={(e) => setFilterPacked(e.target.value)}
          className="mb-4 p-1 rounded-md"
        >
          <option value="ALL">Show All</option>
          <option value="PACKED">Packed</option>
          <option value="UNPACKED">Unpacked</option>
        </select>
      </div>

      <ol className="divide-y divide-gray-400 list-decimal">
        {filteredItems.map((item) => (
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
        ))}
      </ol>
      {trip?.packing_list_items && trip.packing_list_items.length > 0 && (
        <div className="flex space-x-4">
          <button
            className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(`/trips/${tripId}`)}
          >
            Back to trip
          </button>
          <button
            className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(`/trips/${tripId}/edit/packinglist`)}
          >
            Edit packing list
          </button>
        </div>
      )}
    </div>
  )
}

export default PackingListPage
