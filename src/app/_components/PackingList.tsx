import React, { useEffect, useState } from "react"
import { FormEvent } from "react"
import { useTripData } from "../_hooks/useTripData"
import { useRouter } from "next/navigation"

interface PackingListItem {
  category: string
  description: string
  id?: number | undefined
}

function AddPackingListItemForm({ tripId }: { tripId: number }) {
  const { trip, fetchTrip } = useTripData()
  const router = useRouter()
  const [packingListItems, setPackingListItems] = useState<PackingListItem[]>([
    { category: "", description: "" },
  ])
  const categories = [
    "Clothing",
    "Electronics",
    "Leisure",
    "Toiletries",
    "Documents",
    "Misc.",
  ]

  useEffect(() => {
    fetchTrip(tripId.toString())
  }, [])

  useEffect(() => {
    if (trip?.packing_list_items && trip?.packing_list_items?.length > 0) {
      setPackingListItems(trip.packing_list_items)
    }
  }, [trip])

  const handleItemChange = (
    index: number,
    field: string,
    value: string,
    id?: number
  ) => {
    const updatedItems = packingListItems.map((item, itemIndex) =>
      index === itemIndex ? { ...item, [field]: value } : item
    )
    setPackingListItems(updatedItems)
  }

  const handleAddItem = () => {
    setPackingListItems([
      ...packingListItems,
      { category: "", description: "" },
    ])
  }

  const handleRemoveItem = (index: number | undefined) => {
    const updatedItems = packingListItems.filter(
      (_, itemIndex) => index !== itemIndex
    )
    setPackingListItems(updatedItems)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    packingListItems.forEach(async (item) => {
      const method = item.id ? "PATCH" : "POST"
      const url = item.id
        ? `http://localhost:3001/trips/${tripId}/packing_list_items/${item.id}`
        : `http://localhost:3001/trips/${tripId}/packing_list_items`

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ packing_list_item: item }),
          credentials: "include",
        })

        if (!response.ok) throw new Error("Network response was not ok.")

        router.push(`/trips/${tripId}`)
        console.log("Item saved successfully", await response.json())
      } catch (error) {
        console.error("Failed to save item:", error)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {packingListItems.map((item, index) => (
        <div key={item.id} className="flex space-x-3 items-center">
          <div className="w-1/3">
            <label
              htmlFor={`category-${item.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id={`category-${item.id}`}
              value={item.category}
              onChange={(e) =>
                handleItemChange(index, "category", e.target.value, item.id)
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor={`description-${item.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id={`description-${item.id}`}
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value, item.id)
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveItem(item.id)}
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Another Item
        </button>
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Packing List
        </button>
      </div>
    </form>
  )
}

export default AddPackingListItemForm