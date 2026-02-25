
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query' });
  }

  // Development fallback: if DATABASE_URL not configured, return mock data
  if (!process.env.DATABASE_URL) {
    const mock = [
      { id: 'mock-1', name: 'Mock Business One', image: '/img/mock1.png', location: 'Mumbai', averageRating: 4.5, services: [{name: 'Advisory'}] },
      { id: 'mock-2', name: 'Mock Business Two', image: '/img/mock2.png', location: 'Bengaluru', averageRating: 4.0, services: [{name: 'Legal'}] },
    ];
    return res.status(200).json({ businesses: mock, similar: false });
  }

  try {
    // Search across multiple fields
    let businesses = await prisma.business.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { bio: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { categoryTags: { has: query } },
        ],
      },
    });

    // If no results, try to find similar businesses (fallback: partial match on name/category)
    if (businesses.length === 0) {
      businesses = await prisma.business.findMany({
        where: {
          OR: [
            { name: { startsWith: query[0], mode: 'insensitive' } },
            { category: { startsWith: query[0], mode: 'insensitive' } },
          ],
        },
        take: 5,
      });
      return res.status(200).json({ businesses, similar: true });
    }

    return res.status(200).json({ businesses, similar: false });
  } catch (error) {
    console.error('Failed to fetch businesses:', error);
    return res.status(500).json({ error: 'Failed to fetch businesses' });
  }
}
