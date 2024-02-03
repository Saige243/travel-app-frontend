"use client"

import React from "react"
import { useRouter } from "next/navigation"

function Trips() {
  const router = useRouter()
  return (
    <div>
      <h1>My Trips</h1>
      <p>Looks like you have no trips planned!</p>
      <p>Let&apos;s add a new one.</p>
      <button
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push("/trips/new")}
      >
        Add a Trip
      </button>
    </div>
  )
}

export default Trips
