import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (typeof query !== 'string' || query.trim().length === 0) {
    return res.status(200).json({ suggestions: [] });
  }

  const q = query.trim();

  // Development fallback: lightweight mock suggestions
  if (!process.env.DATABASE_URL) {
    const mock = [
      'Mock Business One',
      'Mock Business Two',
      'Advisory',
      'Legal',
      'Mumbai',
      'Bengaluru',
      'Marketing',
      'Financial Services',
    ];
    const filtered = mock.filter((s) => s.toLowerCase().includes(q.toLowerCase())).slice(0, 10);
    return res.status(200).json({ suggestions: filtered });
  }

  try {
    const rows = await prisma.business.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      select: { name: true, category: true, location: true },
      take: 30,
    });

    const unique = new Set<string>();
    rows.forEach((r) => {
      if (r.name) unique.add(r.name);
      if (r.category) unique.add(r.category);
      if (r.location) unique.add(r.location);
    });

    const suggestions = Array.from(unique).slice(0, 10);
    return res.status(200).json({ suggestions });
  } catch (error) {
    console.error('suggestions api error', error);
    return res.status(500).json({ suggestions: [] });
  }
}
