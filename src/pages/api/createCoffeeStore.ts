import type { NextApiRequest, NextApiResponse } from 'next'

import Airtable from 'airtable'
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY as string,
)

const table = base('coffee-stores')
console.log(table)

type CoffeeStoreRecord = {
  imgUrl: string
  name: string
  id: string
  address: string
  locality: string
  rating: number
}

type Message = {
  error?: string
  message?: string
  // [x: string]: any
}

const createCoffeeStore = async (
  req: NextApiRequest,
  res: NextApiResponse<CoffeeStoreRecord[] | Message>,
) => {
  console.log('request', req.body)

  if (req.method === 'POST') {
    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="2"`,
        })
        .firstPage()

      const records = findCoffeeStoreRecords.map((record) => {
        return { ...record.fields } as CoffeeStoreRecord
      })

      console.log({ findCoffeeStoreRecords })

      if (findCoffeeStoreRecords.length > 0) {
        res.json(records)
      } else {
        const createRecords = await table.create([
          {
            fields: {
              id: '2',
              name: 'My favorite coffee store',
              address: 'road 5',
              locality: 'New York',
              rating: 200,
              imgUrl: 'some-image.png',
            },
          },
        ])

        const records = createRecords.map((record) => {
          return { ...record.fields } as CoffeeStoreRecord
        })

        res.json(records)
      }
    } catch (err) {
      console.error('Error finding store', err)
      res.status(500).json({ error: 'Something went wrong' })
    }
  }
}

export default createCoffeeStore
