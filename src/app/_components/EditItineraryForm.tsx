"use client"

import React, { useEffect, useState } from "react"
import { Trip, ItineraryItem } from "../types"
import { useRouter } from "next/navigation"

function AddItineraryItemForm({ trip }: { trip: Trip | null }) {
  const router = useRouter()
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([])

  useEffect(() => {
    if (trip && trip.itinerary_items.length > 0) {
      setItineraryItems(trip.itinerary_items)
    } else {
      setItineraryItems([
        {
          title: "",
          description: "",
          time: "",
          date: "",
          location: "",
        },
      ])
    }
  }, [trip])

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newItineraryItems: ItineraryItem[] = [...itineraryItems]
    newItineraryItems[index] = {
      ...newItineraryItems[index],
      [e.target.name as keyof ItineraryItem]: e.target.value,
    }
    setItineraryItems(newItineraryItems)
  }

  const handleAddItem = () => {
    setItineraryItems([
      ...itineraryItems,
      {
        title: "",
        description: "",
        time: "",
        date: "",
        location: "",
      },
    ])
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const isSingleSubmission =
      itineraryItems.length === 1 && itineraryItems[0].title !== ""

    const submissionData = isSingleSubmission
      ? { itinerary_item: { ...itineraryItems[0], trip_id: trip?.id } }
      : {
          itinerary_items: itineraryItems.map((item) => ({
            ...item,
            trip_id: trip?.id,
          })),
        }

    try {
      const url = `http://localhost:3001/trips/${trip?.id}/itinerary_items`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) throw new Error("Network response was not ok.")

      alert("Itinerary updated!")
      router.push(`/trips/${trip?.id}`)
    } catch (error) {
      console.error("Failed to update item", error)
      alert("Failed to add items. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="font-bold text-2xl pb-2">Edit {trip?.title} itinerary</h1>
      {itineraryItems.map((item, index) => (
        <div key={index} className="border p-4 rounded-lg shadow space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={item.title}
            onChange={(e) => handleChange(index, e)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleChange(index, e)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            rows={2}
          ></textarea>
          <input
            type="time"
            name="time"
            placeholder="Time"
            value={item.time}
            onChange={(e) => handleChange(index, e)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={item.date}
            onChange={(e) => handleChange(index, e)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={item.location}
            onChange={(e) => handleChange(index, e)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
          />
        </div>
      ))}
      <div className="flex justify-start pt-4 pb-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save Itinerary
        </button>
      </div>
      <button
        type="button"
        onClick={() => router.push(`/trips/${trip?.id}/itinerary/new`)}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add another item
      </button>
    </form>
  )
}

export default AddItineraryItemForm
