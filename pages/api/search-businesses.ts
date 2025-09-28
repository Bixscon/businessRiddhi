import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query' });
  }

  try {
    const businesses = await prisma.business.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return res.status(200).json(businesses);
  } catch (error) {
    console.error('Failed to fetch businesses:', error);
    return res.status(500).json({ error: 'Failed to fetch businesses' });
  }
}
