import Airtable, { FieldSet, Records, Record } from 'airtable'

import { CoffeeStoreRecord } from '@/types'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY as string,
)

const table = base('coffee-stores')

const getMinifiedRecord = (record: Record<FieldSet>) => {
  return {
    ...record.fields,
  } as CoffeeStoreRecord
}

const getMinifiedRecords = (records: Records<FieldSet>) => {
  return records.map((record) => getMinifiedRecord(record))
}

export { table, getMinifiedRecords }
