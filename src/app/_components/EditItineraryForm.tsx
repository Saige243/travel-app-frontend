"use client"

import React, { useEffect, useState } from "react"
import { Trip, ItineraryItem } from "../types"
import { useRouter } from "next/navigation"
import { Button } from "./Button"
import toast from "react-hot-toast"

function EditItineraryForm({ trip }: { trip: Trip | null }) {
  const router = useRouter()
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([])

  useEffect(() => {
    if (trip && trip.itinerary_items.length > 0) {
      const itemsWithDefaults = trip.itinerary_items.map((item) => ({
        ...item,
        title: item.title || "",
        description: item.description || "",
        time: item.time || "",
        date: item.date || "",
        location: item.location || "",
      }))
      setItineraryItems(itemsWithDefaults)
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
    console.log(itineraryItems)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (!trip || !trip.start_date || !trip.end_date) {
      toast("Trip dates are not defined.", { icon: "⚠️" })
      return
    }

    const startDate = new Date(trip.start_date)
    const endDate = new Date(trip.end_date)

    for (const item of itineraryItems) {
      const itemDate = new Date(item.date)
      if (itemDate < startDate || itemDate > endDate) {
        toast(
          `All itinerary items must fit within the trip date range. ${trip.start_date} - ${trip.end_date}`,
          { icon: "⚠️" }
        )
        return
      }
    }

    const saveIteneraryItem = async (item: ItineraryItem) => {
      const url = item.id
        ? `http://localhost:3001/trips/${trip?.id}/itinerary_items/${item.id}`
        : `http://localhost:3001/trips/${trip?.id}/itinerary_items`
      const method = item.id ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itinerary_item: { ...item, trip_id: trip?.id },
        }),
        credentials: "include",
      })

      if (!res.ok) {
        console.error("Failed to save itinerary item", res)
        toast.error("Failed to save itinerary item. Please try again.")
      }

      return res.json()
    }
    try {
      for (const item of itineraryItems) {
        await saveIteneraryItem(item)
      }

      toast.success("Itinerary saved!")
      router.push(`/trips/${trip?.id}`)
    } catch (error) {
      console.error("Failed to save itinerary", error)
      toast.error("Failed to save itinerary. Please try again.")
    }
  }

  const handleDelete = async ({
    e,
    itemId,
  }: {
    itemId: number | undefined
    e: React.MouseEvent<HTMLButtonElement>
  }) => {
    e.preventDefault()
    try {
      const url = `http://localhost:3001/trips/${trip?.id}/itinerary_items/${itemId}`
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) throw new Error("Network response was not ok.")

      toast.success("Itinerary item deleted!")
    } catch (error) {
      console.error("Failed to delete item", error)
      toast.error("Failed to delete item. Please try again.")
    }

    const newItineraryItems = itineraryItems.filter(
      (item) => item.id !== itemId
    )
    setItineraryItems(newItineraryItems)
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
          <Button
            text="Delete Item"
            className="bg-red-500"
            onClick={(e: any) => handleDelete({ itemId: item.id, e })}
          />
        </div>
      ))}
      <div className="flex justify-start pt-4 pb-4">
        <Button text="Save Itinerary" type="submit" className="bg-green-600" />
      </div>
      <Button
        text="Add more items"
        onClick={() => router.push(`/trips/${trip?.id}/itinerary/new`)}
      />
    </form>
  )
}

export default EditItineraryForm
