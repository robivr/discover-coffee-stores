import type { NextApiRequest, NextApiResponse } from 'next'
import { CoffeeStoreRecord } from '@/types'
import { getMinifiedRecords, table, findRecordByFilter } from '@/lib/airtable'

type Message = {
  error?: string
  message?: string
}

const createCoffeeStore = async (
  req: NextApiRequest,
  res: NextApiResponse<CoffeeStoreRecord[] | Message>,
) => {
  if (req.method === 'POST') {
    const { id, name, address, locality, rating, imgUrl } = req.body

    if (!id) {
      res.status(400).json({ message: 'id is missing' })
      return
    }

    try {
      const records = await findRecordByFilter(id as string)

      if (records.length > 0) {
        res.json(records)
      } else {
        if (id && name) {
          const createRecords = await table.create([
            {
              fields: {
                id,
                name,
                address,
                locality,
                rating,
                imgUrl,
              },
            },
          ])

          const records = getMinifiedRecords(createRecords)

          res.json(records)
        } else {
          res.status(400).json({ message: 'id or name is missing' })
        }
      }
    } catch (err: any) {
      console.error('Error creating or finding a store', err)
      res.status(500).json({
        message: 'Error creating or finding a store',
        error: err.message,
      })
    }
  }
}

export default createCoffeeStore
