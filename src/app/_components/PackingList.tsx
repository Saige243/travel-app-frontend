"use client"

import React, { useEffect, useState } from "react"
import { FormEvent } from "react"
import { useTripData } from "../_hooks/useTripData"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { Button } from "./Button"
import toast from "react-hot-toast"
interface PackingListItem {
  category: string
  description: string
  id?: number | undefined
  tempId?: string | undefined
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
      { category: "", description: "", tempId: uuidv4() },
    ])
  }

  const handleRemoveItem = async (id?: number, tempId?: string) => {
    if (id) {
      const url = `http://localhost:3001/trips/${tripId}/packing_list_items/${id}`
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) throw new Error("Network response was not ok.")
      console.log("Item deleted successfully", await response.text())
      const updatedItems = packingListItems.filter((item) => item.id !== id)
      setPackingListItems(updatedItems)
    } else {
      const updatedItems = packingListItems.filter(
        (item) => item.tempId !== tempId
      )
      setPackingListItems(updatedItems)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const saveOperations = packingListItems.map((item) => {
      const method = item.id ? "PATCH" : "POST"
      const url = item.id
        ? `http://localhost:3001/trips/${tripId}/packing_list_items/${item.id}`
        : `http://localhost:3001/trips/${tripId}/packing_list_items`

      return fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packing_list_item: item }),
        credentials: "include",
      }).then((response) => {
        if (!response.ok) throw new Error("Network response was not ok.")
        return response.json()
      })
    })

    try {
      await Promise.all(saveOperations)

      toast.success("Packing list saved successfully!")
      router.push(`/trips/${tripId}`)
    } catch (error) {
      console.error("Failed to save item:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {packingListItems.map((item, index) => (
        <div
          key={item.id || item.tempId}
          className="flex space-x-3 items-center"
        >
          <div className="w-1/3">
            <label
              htmlFor={`category-${item.id || item.tempId}`}
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Category
            </label>
            <select
              id={`category-${item.id || item.tempId}`}
              value={item.category}
              onChange={(e) =>
                handleItemChange(index, "category", e.target.value, item.id)
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-black"
            >
              <option value="">Select a category</option>
              {categories.map((category, catIndex) => (
                <option key={catIndex} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor={`description-${item.id}`}
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Description
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                id={`description-${item.id || item.tempId}`}
                value={item.description}
                onChange={(e) =>
                  handleItemChange(
                    index,
                    "description",
                    e.target.value,
                    item.id
                  )
                }
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-black"
              />
              <Button
                type="button"
                onClick={() => handleRemoveItem(item.id, item.tempId)}
                text="Remove"
                className="bg-red-500"
              />
            </div>
          </div>
        </div>
      ))}
      <div>
        <Button type="button" onClick={handleAddItem} text="Add Another Item" />
      </div>
      <div className="pt-12">
        <Button type="submit" text="Save Packing List" />
      </div>
      <div>
        <Button
          type="button"
          onClick={() => router.push(`/trips/${tripId}`)}
          text="Back to trip"
          className="bg-green-500"
        />
      </div>
    </form>
  )
}

export default AddPackingListItemForm
