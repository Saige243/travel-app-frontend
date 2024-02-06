import React, { useState } from "react"
import { FormEvent } from "react"

function AddPackingListItemForm({ tripId }: { tripId: number }) {
  const [packingListItems, setPackingListItems] = useState([
    { category: "", description: "" },
  ])
  const categories = [
    "Clothing",
    "Electronics",
    "Leisure",
    "Toiletries",
    "Documents",
    "Misc.",
  ]

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = packingListItems.map((item, itemIndex) =>
      index === itemIndex ? { ...item, [field]: value } : item
    )
    setPackingListItems(updatedItems)
  }

  const handleAddItem = () => {
    setPackingListItems([
      ...packingListItems,
      { category: "", description: "" },
    ])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const isMultiple = packingListItems.length > 1
    const url = `http://localhost:3001/trips/${tripId}/packing_list_items`
    const payload = isMultiple
      ? { packing_list_items: packingListItems }
      : { packing_list_item: packingListItems[0] }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      })

      if (response.ok) {
        setPackingListItems([{ category: "", description: "" }])
        console.log("Packing list items saved")
      } else {
        console.error("Failed to save packing list items")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {packingListItems.map((item, index) => (
        <div key={index} className="flex space-x-3">
          <div className="w-1/3">
            <label
              htmlFor={`category-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id={`category-${index}`}
              value={item.category}
              onChange={(e) =>
                handleItemChange(index, "category", e.target.value)
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor={`description-${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id={`description-${index}`}
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      ))}
      <div className="space-y-4">
        <div>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Another Item
          </button>
        </div>
        <div className="pt-8 ">
          <button
            type="submit"
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Packing List
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddPackingListItemForm
