import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const breed = req.query.breed
  res.status(200).json({ message: `I love ${breed}` })
}
