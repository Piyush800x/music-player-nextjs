import type { NextApiRequest, NextApiResponse } from 'next'
import { listObjects, getObject } from '../../../lib/aws'

const bucketName = 'musics';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { key } = req.query;
      if (key) {
        const data = await getObject(bucketName, key as string);
        res.status(200).json(data);
      } else {
        const data = await listObjects(bucketName);
        res.status(200).json(data);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
