import type { NextApiRequest, NextApiResponse } from 'next'

import Airtable, { FieldSet, Records } from 'airtable'
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY as string,
)

const table = base('coffee-stores')
console.log(table)

type ResponseData =
  | {
      message?: string
    }
  | Records<FieldSet>

const createCoffeeStore = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  // console.log(req)

  if (req.method === 'POST') {
    const findCoffeeStoreRecords = await table
      .select({
        filterByFormula: `id="1"`,
      })
      .firstPage()

    console.log({ findCoffeeStoreRecords })

    if (findCoffeeStoreRecords.length > 0) {
      res.json(findCoffeeStoreRecords)
    }
  }
}

export default createCoffeeStore
