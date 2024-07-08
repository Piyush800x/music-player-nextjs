import type { NextApiRequest, NextApiResponse } from 'next'
import { getMusicURL } from '../../../lib/aws'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const key = req.query;
  console.log(`key: ${key}`)
  const url = await getMusicURL(key);
  return res.status(200).json({url})
}
