import { createApi } from 'unsplash-js'

import { CoffeeStore, FourSquareResult } from '@/types'

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY as string,
})

const getUrlForCoffeeStores = (
  latLong: string,
  query: string,
  limit: number,
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30,
  })

  const unsplashResults = photos.response?.results.map(
    (result) => result.urls['small'],
  )
  console.log('unsplash', unsplashResults)

  return unsplashResults
}

export const fetchCoffeeStores = async (): Promise<CoffeeStore[]> => {
  const photos = await getListOfCoffeeStorePhotos()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_API_KEY as string,
    },
  }

  const response = await fetch(
    getUrlForCoffeeStores(
      '43.72722099443159%2C-79.45272353965996',
      'coffee',
      16,
    ),
    options,
  )
  const data = await response.json()

  //.catch((err) => console.error(err))

  return data.results.map((result: FourSquareResult, i: number) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      locality: result.location.locality,

      imgUrl: photos && photos.length > 0 ? photos[i] : null,
    }
  })
}
