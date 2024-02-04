"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

type Trip = {
  id: number
  title: string
  location: string
  start_date: string
  end_date: string
}

function EditTrip() {
  const { id } = useParams()
  const router = useRouter()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    start_date: "",
    end_date: "",
  })

  async function fetchTrip() {
    const tripId = id
    const url = `http://localhost:3001/trips/${tripId}`
    const res = await fetch(url, { credentials: "include" })

    if (
      res.ok &&
      res.headers.get("Content-Type")?.includes("application/json")
    ) {
      const data: Trip = await res.json()
      setTrip(data)
      setFormData({
        title: data.title,
        location: data.location,
        start_date: data.start_date,
        end_date: data.end_date,
      })
    } else {
      console.error("Failed to fetch trip or the response is not JSON")
    }
  }

  useEffect(() => {
    fetchTrip()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const tripId = id
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
      console.log("Trip updated successfully")
    } else {
      console.error("Failed to update trip")
    }
  }

  return (
    <>
      {!trip ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Edit Trip</h1>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Start Date:
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            End Date:
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
            />
          </label>
          <br />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 my-12 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <div>
            <button
              onClick={() => router.back()}
              className="bg-blue-700 ml-2 hover:bg-blue-800 text-white font-bold py-2 my-12 px-4 rounded"
            >
              Back to trip
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default EditTrip
