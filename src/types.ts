export type CoffeeStoreBase = {
  name: string
  imgUrl: string
  id: string
  address: string
  locality: string
}

export type CoffeeStore = CoffeeStoreBase & {
  href: string
  rating: number
}

export type CoffeeStoreRecord = CoffeeStoreBase & {
  rating: number
}

export type FourSquareResult = {
  name: string
  imgUrl: string
  href: string
  fsq_id: string
  location: {
    address: string
    locality: string
  }
}
