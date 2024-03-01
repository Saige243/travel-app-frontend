import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ItineraryItem } from "@/app/types"
import { format, parseISO } from "date-fns"

interface ItineraryItemsProps {
  itineraries: ItineraryItem[]
}

function formatDate(dateString: string) {
  const date = parseISO(dateString)
  return format(date, "EEEE, MMMM d")
}

function formatTime(timeString: string) {
  const time = parseISO(timeString)
  return format(time, "hh:mm a")
}

const ItineraryItems: React.FC<ItineraryItemsProps> = ({ itineraries }) => {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [filteredItems, setFilteredItems] = useState<{
    [key: string]: ItineraryItem[]
  }>({})
  const router = useRouter()

  const groupItemsByDate = (
    items: ItineraryItem[]
  ): { [key: string]: ItineraryItem[] } => {
    return items.reduce(
      (acc: { [key: string]: ItineraryItem[] }, item: ItineraryItem) => {
        ;(acc[item.date] = acc[item.date] || []).push(item)
        return acc
      },
      {}
    )
  }

  useEffect(() => {
    console.log(selectedDate)
    const filtered = itineraries.filter((item) =>
      selectedDate ? item.date === selectedDate : true
    )
    console.log(filtered)
    const grouped = groupItemsByDate(filtered)
    setFilteredItems(grouped)
  }, [selectedDate, itineraries])

  return (
    <div>
      {itineraries.length > 0 ? (
        <>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-1 border rounded"
          >
            <option value="">All Dates</option>
            {[...new Set(itineraries.map((item) => item.date))].map((date) => (
              <option key={date} value={date}>
                {format(date, "EEEE, MMMM d")}
              </option>
            ))}
          </select>
          {Object.entries(filteredItems).map(([date, items], index) => (
            <div key={index} className="pt-4">
              <h2 className="font-bold pb-2 text-lg ">{formatDate(date)}</h2>
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="border ml-4 p-3 m-1 rounded shadow space-y-2"
                >
                  <div className="flex flex-col space-y-3 md:space-y-0 md:grid md:grid-cols-4 justify-between">
                    <div>
                      <h2 className="font-bold underline">Activity:</h2>
                      <p>{item.title || "No title provided"}</p>
                    </div>
                    <div>
                      <h2 className="font-bold underline">Description:</h2>
                      <p>{item.description || "No description provided"}</p>
                    </div>
                    <div>
                      <h2 className="font-bold underline">Time:</h2>
                      <p>
                        {item.time ? formatTime(item.time) : "No time provided"}
                      </p>
                    </div>
                    <div>
                      <h2 className="font-bold underline">Location:</h2>
                      <p>{item.location || "No location provided"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className="py-6">
          <div className="text-center">
            <p className="text-xl">You have no itinerary items!</p>
            <button
              className="px-4 mt-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => router.push(`${trip?.id}/itinerary/new`)}
            >
              Add itinerary items
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItineraryItems
