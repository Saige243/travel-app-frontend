import React, { useState } from "react"

function AddPackingListItemForm({ tripId }: { tripId: number }) {
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const categories = [
    "Clothing",
    "Electronics",
    "Leisure",
    "Toiletries",
    "Documents",
    "Misc.",
  ]

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const url = `/trips/${tripId}/packing_list_items`
    const data = { category, description }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ packing_list_item: data }),
      })

      if (response.ok) {
        setCategory("")
        setDescription("")
      } else {
        console.error("Failed to add item to packing list")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="flex px-4 py-5 bg-white space-y-6 sm:p-6 items-center space-x-4">
          <div className="w-1/3">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

          <div className="w-2/3 justify-center items-center ">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            ></input>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add to Packing List
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddPackingListItemForm
