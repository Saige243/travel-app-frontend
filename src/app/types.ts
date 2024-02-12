export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
}

export type Trip = {
  id: number
  title: string
  description: string
  location: string
  packing_list_items: PackingListItem[]
  start_date: string
  end_date: string
  accommodations: Accommodation[]
  itinerary_items: ItineraryItem[]
}

export type PackingListItem = {
  id?: number
  category: string
  description: string
  packed: boolean
}

export type Accommodation = {
  id: number
  name: string
  address: string
  check_in_date: string
  check_out_date: string
  contact_number: string
  notes: string[]
}

export type ItineraryItem = {
  id: number
  title: string
  description: string
  time: string
  date: string
  location: string
}
