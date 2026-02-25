
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;

  if (typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query' });
  }

  try {
    // Search across multiple fields
    let opportunities = await prisma.opportunity.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { type: { contains: query, mode: 'insensitive' } },
          { subtype: { contains: query, mode: 'insensitive' } },
          { targetIndustry: { contains: query, mode: 'insensitive' } },
          { targetSector: { contains: query, mode: 'insensitive' } },
        ],
        isDraft: false,
      },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            image: true,
            location: true
          }
        }
      }
    });

    // If no results, try to find similar opportunities (fallback: partial match on title/type)
    if (opportunities.length === 0) {
      opportunities = await prisma.opportunity.findMany({
        where: {
          OR: [
            { title: { startsWith: query[0], mode: 'insensitive' } },
            { type: { startsWith: query[0], mode: 'insensitive' } },
          ],
          isDraft: false,
        },
        include: {
          business: {
            select: {
              id: true,
              name: true,
              image: true,
              location: true
            }
          }
        },
        take: 5,
      });
      return res.status(200).json({ opportunities, similar: true });
    }

    return res.status(200).json({ opportunities, similar: false });
  } catch (error) {
    console.error('Failed to fetch funding opportunities:', error);
    return res.status(500).json({ error: 'Failed to fetch funding opportunities' });
  }
}
