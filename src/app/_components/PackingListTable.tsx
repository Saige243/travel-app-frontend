import React from "react"
import { useRouter } from "next/navigation"
import { PackingListItem, Trip } from "../types"

function PackingListTable({ trip }: { trip: Trip | null }) {
  const router = useRouter()

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold py-4">Packing List:</h2>
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
                  />
                </div>
              </li>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-xl">Your packing list is empty!</p>
              <button
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
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
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={() => router.push(`${trip?.id}/packinglist`)}
              >
                Go to packing list
              </button>
            </div>
            <div className="pt-4">
              <button
                className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={() => router.push(`${trip?.id}/edit/packinglist`)}
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

export default PackingListTable
