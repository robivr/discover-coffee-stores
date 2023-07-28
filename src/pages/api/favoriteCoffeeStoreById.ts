import type { NextApiRequest, NextApiResponse } from 'next'

import { findRecordByFilter, table, getMinifiedRecord } from '@/lib/airtable'
import { CoffeeStoreRecord } from '@/types'

type Message = {
  message: string
  error?: string
}

const favoriteCoffeeStoresById = async (
  req: NextApiRequest,
  res: NextApiResponse<CoffeeStoreRecord | Message>,
) => {
  if (req.method === 'PUT') {
    try {
      const { id } = req.body

      if (!id) {
        throw new Error('id required')
      }

      const records = await findRecordByFilter(id as string)

      if (records.length > 0) {
        const record = records[0]

        const calculateRating = record.rating + 1

        const updateRecord = await table.update([
          {
            id: record.recordId,
            fields: {
              rating: calculateRating,
            },
          },
        ])

        if (updateRecord) {
          const minifiedRecord = getMinifiedRecord(updateRecord[0])
          res.json(minifiedRecord)
        } else {
          res.json({ message: 'record not updated' })
        }
      } else {
        res
          .status(404)
          .json({ message: `Coffee store with id ${id} could not be found` })
      }
    } catch (err: any) {
      console.error(err.message)
      res
        .status(500)
        .json({ message: 'Error upvoting coffee store', error: err.message })
    }
  }
}

export default favoriteCoffeeStoresById
