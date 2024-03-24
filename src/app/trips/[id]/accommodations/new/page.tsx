"use client"

import { useState, FormEvent, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useTripData } from "../../../../_hooks/useTripData"
import { Button } from "@/app/_components/Button"

interface AccommodationFormState {
  name: string
  address: string
  checkInDate: string
  checkOutDate: string
  contactNumber: string
  notes: string
}

export default function AddAccommodation() {
  const router = useRouter()
  const { trip, fetchTrip } = useTripData()
  const { id } = useParams()
  const tripId = parseInt(id as string)
  const [formData, setFormData] = useState<AccommodationFormState>({
    name: "",
    address: "",
    checkInDate: "",
    checkOutDate: "",
    contactNumber: "",
    notes: "",
  })

  useEffect(() => {
    fetchTrip(id as string)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await fetch(
      `http://localhost:3001/trips/${tripId}/accommodations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          check_in_date: formData.checkInDate,
          check_out_date: formData.checkOutDate,
          contact_number: formData.contactNumber,
          notes: formData.notes,
        }),
      }
    )

    if (response.ok) {
      alert("Accommodation added successfully!")
      router.back()
    } else {
      alert("Failed to add accommodation")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Add Accommodation for {trip?.title}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="md:flex w-full md:space-x-4">
          <div className="md:w-1/2">
            <label htmlFor="name" className="block text-sm font-medium pb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name (e.g. Hotel Example, Airbnb Example)"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full p-1 rounded-sm"
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="address" className="block text-sm font-medium pb-1">
              Address
            </label>
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="textarea textarea-bordered w-full p-1 rounded-sm"
            />
          </div>
        </div>
        <div className="flex w-full space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="checkInDate"
              className="block text-sm font-medium pb-1"
            >
              Check-in Date
            </label>
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              className="input input-bordered w-full p-1 rounded-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="checkOutDate"
              className="block text-sm font-medium pb-1"
            >
              Check-out Date
            </label>
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              className="input input-bordered w-full p-1 rounded-sm"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium pb-1"
          >
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="input input-bordered w-full p-1 rounded-sm"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium pb-1">
            Notes
          </label>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="textarea textarea-bordered w-full p-1 rounded-sm"
            rows={4}
          />
        </div>
        <Button
          text="Add Accomondation"
          type="submit"
          className="bg-green-600"
        />
      </form>
    </div>
  )
}
