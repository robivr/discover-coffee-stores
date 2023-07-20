import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  date: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const date = new Date()

  res.status(200).json({ date: date.toDateString() })
}
