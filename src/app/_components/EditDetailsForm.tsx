"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Trip } from "../types"
import { Button } from "./Button"
import toast from "react-hot-toast"

function EditDetailsForm({ trip }: { trip: Trip | null }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    start_date: "",
    end_date: "",
    description: "",
  })

  useEffect(() => {
    trip &&
      setFormData({
        title: trip?.title,
        location: trip?.location,
        start_date: trip?.start_date,
        end_date: trip?.end_date,
        description: trip?.description,
      })
  }, [trip])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const tripId = trip?.id
    const url = `http://localhost:3001/trips/${tripId}`
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })

    if (res.ok) {
      toast.success("Details updated successfully!")
    } else {
      console.error("Failed to update trip")
    }
  }

  if (!trip) {
    return <div>Loading...</div>
  }

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-4">Edit trip details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="sm:w-1/2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:text-black"
            />
          </div>
          <div className="sm:w-1/2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:text-black"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Start Date
            </label>
            <input
              id="start_date"
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:text-black"
            />
          </div>
          <div className="pb-4 w-1/2">
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              End Date
            </label>
            <input
              id="end_date"
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:text-black"
            />
          </div>
        </div>
        <div className="pb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 dark:text-black"
            rows={3}
          ></textarea>
        </div>
        <Button text="Save trip details" type="submit" />
      </form>
    </div>
  )
}

export default EditDetailsForm
