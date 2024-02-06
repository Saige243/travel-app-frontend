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
}

export type PackingListItem = {
  id?: number
  category: string
  description: string
  packed: boolean
}
