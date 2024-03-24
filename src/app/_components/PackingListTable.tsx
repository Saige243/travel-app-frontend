import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { PackingListItem, Trip } from "../types"
import { Button } from "./Button"

function PackingListTable({ trip }: { trip: Trip | null }) {
  const router = useRouter()
  const [filterCategory, setFilterCategory] = useState("ALL")
  const [filterPacked, setFilterPacked] = useState("ALL")

  const filteredItems =
    trip?.packing_list_items.filter((item) => {
      const categoryMatch =
        filterCategory === "ALL" || item.category === filterCategory
      const packedMatch =
        filterPacked === "ALL" ||
        (filterPacked === "PACKED" && item.packed) ||
        (filterPacked === "UNPACKED" && !item.packed)
      return categoryMatch && packedMatch
    }) || []

  const filterSelectDropdown = (
    <div className="mb-4">
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="mb-4 mr-4 p-1 rounded-md text-black"
      >
        <option value="ALL">Filter by Category</option>
        {Array.from(
          new Set(trip?.packing_list_items.map((item) => item.category) || [])
        ).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={filterPacked}
        onChange={(e) => setFilterPacked(e.target.value)}
        className="mb-4 p-1 rounded-md text-black"
      >
        <option value="ALL">Show All</option>
        <option value="PACKED">Packed</option>
        <option value="UNPACKED">Unpacked</option>
      </select>
    </div>
  )

  const filteredTable = (
    <>
      <div className="py-2 grid grid-cols-3 justify-center items-center text-lg">
        <h2 className="px-2 font-bold">Category</h2>
        <h2 className="px-2 font-bold">Item</h2>
        <h2 className="px-2 font-bold text-right">Packed?</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredItems.length > 0 &&
          filteredItems.map((item: PackingListItem) => (
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
                  readOnly
                  onClick={() =>
                    alert(
                      "Want to change the packed status? Head to the packing list page!"
                    )
                  }
                />
              </div>
            </li>
          ))}
      </ul>
      <div className="flex space-x-4">
        <Button
          text="Go to packing list"
          onClick={() => router.push(`/trips/${trip?.id}/packinglist`)}
        />
        <Button
          text="Edit packing list"
          onClick={() => router.push(`/trips/${trip?.id}/edit/packinglist`)}
        />
      </div>
    </>
  )

  const emtpyTableButtons = (
    <div className="text-center py-6">
      <p className="text-xl">Your packing list is empty!</p>
      <Button
        text="Create packing list"
        onClick={() => router.push(`/trips/${trip?.id}/edit/packinglist`)}
      />
    </div>
  )

  return (
    <div>
      <h2 className="text-3xl font-bold py-4">Packing List:</h2>
      {filterSelectDropdown}

      {trip?.packing_list_items && trip.packing_list_items.length > 0
        ? filteredTable
        : emtpyTableButtons}
    </div>
  )
}

export default PackingListTable
