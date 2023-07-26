import type { NextApiRequest, NextApiResponse } from 'next'

import { getMinifiedRecords, table } from '@/lib/airtable'
import { CoffeeStoreRecord } from '@/types'

type Message = {
  message: string
  error?: string
}

const getCoffeeStoresById = async (
  req: NextApiRequest,
  res: NextApiResponse<CoffeeStoreRecord[] | Message>,
) => {
  const { id } = req.query

  try {
    if (!id) {
      throw new Error('id required')
    }

    const findCoffeeStoreRecords = await table
      .select({
        filterByFormula: `id="${id}"`,
      })
      .firstPage()

    if (findCoffeeStoreRecords.length > 0) {
      const records = getMinifiedRecords(findCoffeeStoreRecords)
      res.json(records)
    } else {
      res.json({ message: `id ${id} could not be found` })
    }
  } catch (err: any) {
    console.error(err.message)
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message })
  }
}

export default getCoffeeStoresById
