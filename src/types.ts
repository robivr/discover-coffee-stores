export type CoffeeStore = {
  name: string
  imgUrl: string
  href: string
  id: string
  address: string
  locality: string
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
