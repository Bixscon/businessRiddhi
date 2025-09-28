import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ error: "Invalid query" });
  }

  try {
    // Run a raw SQL query with Postgres full-text search
    const businesses = await prisma.$queryRawUnsafe<any[]>(`
      SELECT id, name, description, industry, "createdAt",
             ts_rank(
               setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
               setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
               setweight(to_tsvector('english', coalesce(industry, '')), 'C'),
               plainto_tsquery('english', $1)
             ) AS rank
      FROM "Business"
      WHERE to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(industry, ''))
            @@ plainto_tsquery('english', $1)
      ORDER BY rank DESC, "createdAt" DESC
      LIMIT 20;
    `, query);

    return res.status(200).json(businesses);
  } catch (error) {
    console.error("Failed to fetch businesses:", error);
    return res.status(500).json({ error: "Failed to fetch businesses" });
  }
}
