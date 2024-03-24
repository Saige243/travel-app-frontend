import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ItineraryItem } from "@/app/types"
import { format, parseISO } from "date-fns"
import { Trip } from "@/app/types"
import { Button } from "./Button"
interface ItineraryItemsProps {
  itineraries: ItineraryItem[]
  trip: Trip | undefined
}

function formatDate(dateString: string) {
  const date = parseISO(dateString)
  return format(date, "EEEE, MMMM d")
}

function formatTime(timeString: string) {
  const time = parseISO(timeString)
  return format(time, "hh:mm a")
}

const ItineraryItems: React.FC<ItineraryItemsProps> = ({
  itineraries,
  trip,
}) => {
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
    const filtered = itineraries.filter((item) =>
      selectedDate ? item.date === selectedDate : true
    )
    const grouped = groupItemsByDate(filtered)
    setFilteredItems(grouped)
  }, [selectedDate, itineraries])

  const IteneraryRowItem = () => {
    return Object.entries(filteredItems).map(
      (
        [date, items]: [string, ItineraryItem[]],
        index: React.Key | null | undefined
      ) => (
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
      )
    )
  }

  const categorySelect = (
    <select
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="p-1 border rounded dark:text-black"
    >
      <option>All Dates</option>
      {[...new Set(itineraries.map((item) => item.date))].map((date) => (
        <option key={date} value={date}>
          {formatDate(date)}
        </option>
      ))}
    </select>
  )

  const addIteneraryItemButton = (
    <Button
      text="Add itenerary items"
      onClick={() => router.push(`${trip?.id}/itinerary/new`)}
    />
  )

  return (
    <div>
      {itineraries.length > 0 ? (
        <>
          {categorySelect}
          <IteneraryRowItem />
          <div className="flex space-x-4">
            <div>
              <Button
                text="Edit itinerary items"
                onClick={() => router.push(`${trip?.id}/edit/itinerary`)}
              />
            </div>
            <div>{addIteneraryItemButton}</div>
          </div>
        </>
      ) : (
        <div className="py-6">
          <div className="text-center">
            <p className="text-xl">You have no itinerary items!</p>
            {addIteneraryItemButton}
          </div>
        </div>
      )}
    </div>
  )
}

export default ItineraryItems
