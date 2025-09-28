import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.query;

  if (typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Invalid query' });
  }

  try {
    const opportunities = await prisma.$queryRawUnsafe<any[]>(`
      SELECT o.id, o.title, o.description, o.type, o.subtype, 
             o."targetIndustry", o."targetSector", o."createdAt",
             b.id as "businessId", b.name as "businessName", 
             b.image as "businessImage", b.location as "businessLocation",
             ts_rank(
               setweight(to_tsvector('english', coalesce(o.title, '')), 'A') ||
               setweight(to_tsvector('english', coalesce(o.description, '')), 'B') ||
               setweight(to_tsvector('english', coalesce(o.type, '')), 'C') ||
               setweight(to_tsvector('english', coalesce(o.subtype, '')), 'C') ||
               setweight(to_tsvector('english', coalesce(o."targetIndustry", '')), 'D') ||
               setweight(to_tsvector('english', coalesce(o."targetSector", '')), 'D'),
               plainto_tsquery('english', $1)
             ) AS rank
      FROM opportunity o
      JOIN business b ON o."businessId" = b.id
      WHERE o."isDraft" = false
        AND to_tsvector('english',
          coalesce(o.title, '') || ' ' ||
          coalesce(o.description, '') || ' ' ||
          coalesce(o.type, '') || ' ' ||
          coalesce(o.subtype, '') || ' ' ||
          coalesce(o."targetIndustry", '') || ' ' ||
          coalesce(o."targetSector", '')
        ) @@ plainto_tsquery('english', $1)
      ORDER BY rank DESC, o."createdAt" DESC
      LIMIT 20;
    `, query);

    return res.status(200).json(opportunities);
  } catch (error) {
    console.error('Failed to fetch funding opportunities:', error);
    return res.status(500).json({ error: 'Failed to fetch funding opportunities' });
  }
}
