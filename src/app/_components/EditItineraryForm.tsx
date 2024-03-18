"use client"

import React, { useEffect, useState } from "react"
import { Trip, ItineraryItem } from "../types"
import { useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { utcToZonedTime, format as tzFormat } from "date-fns-tz"

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
    const { name, value } = e.target
    console.log(e.target)

    if (name === "time") {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const currentDate = new Date()
      const dateTimeString = `${format(
        currentDate,
        "yyyy-MM-dd"
      )}T${value}:00.000Z`

      const zonedTime = utcToZonedTime(parseISO(dateTimeString), timeZone)

      const formattedTime = tzFormat(zonedTime, "HH:mm", { timeZone })
      console.log(formattedTime)
    }

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
      alert("Trip dates are not defined.")
      return
    }

    const startDate = new Date(trip.start_date)
    const endDate = new Date(trip.end_date)

    const updatedItems = itineraryItems.map((item) => {
      const combinedDateTime = `${item.date}T${item.time}`
      return { ...item, datetime: combinedDateTime }
    })

    for (const item of itineraryItems) {
      const itemDate = new Date(item.date)
      if (itemDate < startDate || itemDate > endDate) {
        alert(
          `All itinerary items must fit within the trip date range. ${trip.start_date} - ${trip.end_date}`
        )
        return
      }
    }

    const payload = updatedItems.map((item) => ({
      ...item,
      datetime: new Date(item.datetime).toISOString(),
    }))

    console.log(payload)

    // console.log(payload)

    // const saveIteneraryItem = async (item: ItineraryItem) => {
    //   const url = item.id
    //     ? `http://localhost:3001/trips/${trip?.id}/itinerary_items/${item.id}`
    //     : `http://localhost:3001/trips/${trip?.id}/itinerary_items`
    //   const method = item.id ? "PATCH" : "POST"

    //   const res = await fetch(url, {
    //     method,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       itinerary_item: { ...item, trip_id: trip?.id },
    //     }),
    //     credentials: "include",
    //   })

    //   if (!res.ok) {
    //     console.error("Failed to save itinerary item", res)
    //     alert("Failed to save itinerary item. Please try again.")
    //   }

    //   return res.json()
    // }
    // try {
    //   for (const item of itineraryItems) {
    //     await saveIteneraryItem(item)
    //   }

    //   alert("Itinerary saved!")
    //   router.push(`/trips/${trip?.id}`)
    // } catch (error) {
    //   console.error("Failed to save itinerary", error)
    //   alert("Failed to save itinerary. Please try again.")
    // }
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

      alert("Itinerary item deleted!")
    } catch (error) {
      console.error("Failed to delete item", error)
      alert("Failed to delete item. Please try again.")
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
          <button
            className="p-1 px-2 bg-red-500 text-white rounded-md"
            onClick={(e) => handleDelete({ itemId: item.id, e })}
          >
            Delete Item
          </button>
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
        Add more items
      </button>
    </form>
  )
}

export default EditItineraryForm
