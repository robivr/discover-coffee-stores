import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchCoffeeStores } from '@/lib/coffee-stores'
import { CoffeeStore } from '@/types'

type Data =
  | {
      coffeeStores: CoffeeStore[]
    }
  | { error: unknown }

const getCoffeeStoresByLocation = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  try {
    const latLong = req.query.latLong as string
    const limit = Number(req.query.limit as string)
    const response = await fetchCoffeeStores(latLong, limit)

    res.status(200).json({ coffeeStores: response })
  } catch (err) {
    console.error('There is an error', err)
    res.status(500).json({ error: err })
  }
}

export default getCoffeeStoresByLocation
