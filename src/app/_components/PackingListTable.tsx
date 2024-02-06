import React from "react"
import { useRouter } from "next/navigation"
import { PackingListItem, Trip } from "../types"

function PackingListTable({ trip }: { trip: Trip | null }) {
  const router = useRouter()
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-center py-4">Packing List:</h2>
      </div>
      <div>
        <div className="flex justify-between items-center font-bold text-xl md:text-2xl py-4 border-b-2">
          <h2>Category</h2>
          <h2>Description</h2>
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
              </li>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-xl">Your packing list is empty!</p>
              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => router.push(`${trip?.id}/edit/packinglist`)}
              >
                Create packing list
              </button>
            </div>
          )}
        </ul>
        {trip?.packing_list_items && trip.packing_list_items.length > 0 && (
          <div className="text-center pt-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => router.push(`${trip?.id}/edit/packinglist`)}
            >
              Edit packing list
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PackingListTable
