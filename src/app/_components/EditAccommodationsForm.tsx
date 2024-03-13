"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Accommodation } from "../types"

interface AccommodationFormState {
  id: string
  name: string
  address: string
  checkInDate: string
  checkOutDate: string
  contactNumber: string
  notes: string
}

interface Trip {
  id: string
  title: string
  location: string
  start_date: string
  end_date: string
  accommodations: AccommodationFormState[] | Accommodation
}

function EditAccommodationsForm({ trip }: { trip: Trip | null }) {
  const router = useRouter()
  const [accommodations, setAccommodations] = useState<
    AccommodationFormState[]
  >([])

  useEffect(() => {
    if (trip) {
      const accommodationsArray = Array.isArray(trip.accommodations)
        ? trip.accommodations
        : trip.accommodations
        ? [trip.accommodations]
        : []

      const accommodationsCamelCase = accommodationsArray.map((acc) => ({
        id: acc.id,
        name: acc.name,
        address: acc.address,
        checkInDate: acc.check_in_date,
        checkOutDate: acc.check_out_date,
        contactNumber: acc.contact_number,
        notes: acc.notes,
      }))

      setAccommodations(accommodationsCamelCase)
    }
  }, [trip])

  const handleAccommodationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedAccommodations = accommodations.map((acc, idx) => {
      if (idx === index) {
        return { ...acc, [e.target.name]: e.target.value }
      }
      return acc
    })
    setAccommodations(updatedAccommodations)
  }

  const handleAccommodationSubmit = async (
    e: React.FormEvent,
    index: number
  ) => {
    e.preventDefault()
    const accommodation = accommodations[index]
    const response = await fetch(
      `http://localhost:3001/trips/${trip?.id}/accommodations/${accommodation.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: accommodation.id,
          name: accommodation.name,
          address: accommodation.address,
          check_in_date: accommodation.checkInDate,
          check_out_date: accommodation.checkOutDate,
          contact_number: accommodation.contactNumber,
          notes: accommodation.notes,
        }),
      }
    )

    if (response.ok) {
      console.log("Accommodation updated successfully")
      alert("Accommodation updated successfully!")
      router.back()
    } else {
      alert("Failed to update accommodation. Please try again.")
    }
  }

  return (
    <div className="pt-8">
      <h2 className="text-xl font-bold mt-8 mb-4">Edit Accommodations</h2>
      {accommodations.length > 0 ? (
        accommodations.map((acc, index) => (
          <form
            key={acc.id}
            onSubmit={(e) => handleAccommodationSubmit(e, index)}
            className="mb-8"
          >
            <div className="mb-4">
              <label
                htmlFor={`name-${index}`}
                className="block font-medium text-sm mb-2"
              >
                Name
              </label>
              <input
                id={`name-${index}`}
                type="text"
                name="name"
                value={acc.name}
                onChange={(e) => handleAccommodationChange(index, e)}
                className="input input-bordered w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`address-${index}`}
                className="block font-medium text-sm mb-2"
              >
                Address
              </label>
              <textarea
                id={`address-${index}`}
                name="address"
                value={acc.address}
                onChange={(e) => handleAccommodationChange(index, e)}
                className="textarea textarea-bordered w-full p-2 rounded"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`checkInDate-${index}`}
                className="block font-medium text-sm mb-2"
              >
                Check-in Date
              </label>
              <input
                id={`checkInDate-${index}`}
                type="date"
                name="checkInDate"
                value={acc.checkInDate}
                onChange={(e) => handleAccommodationChange(index, e)}
                className="input input-bordered w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`checkOutDate-${index}`}
                className="block font-medium text-sm mb-2"
              >
                Check-out Date
              </label>
              <input
                id={`checkOutDate-${index}`}
                type="date"
                name="checkOutDate"
                value={acc.checkOutDate}
                onChange={(e) => handleAccommodationChange(index, e)}
                className="input input-bordered w-full p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={`contactNumber-${index}`}
                className="block font-medium text-sm mb-2"
              >
                Contact Number
              </label>
              <input
                id={`contactNumber-${index}`}
                type="tel"
                name="contactNumber"
                value={acc.contactNumber}
                onChange={(e) => handleAccommodationChange(index, e)}
                className="input input-bordered w-full p-2 rounded"
              />
            </div>
            <div className="mb-8">
              <label
                htmlFor={`notes-${index}`}
                className="block font-medium text-sm mb-2"
              >
                Notes
              </label>
              <textarea
                id={`notes-${index}`}
                name="notes"
                value={acc.notes}
                onChange={(e) => handleAccommodationChange(index, e)}
                className="textarea textarea-bordered w-full p-2 rounded"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Accommodations
            </button>
          </form>
        ))
      ) : (
        <div className="text-center py-6">
          <p className="text-xl">You have no accommodations!</p>
          <button
            className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => router.push(`/trips/${trip?.id}/accommodations/new`)}
          >
            Add accommodations
          </button>
        </div>
      )}
    </div>
  )
}

export default EditAccommodationsForm
