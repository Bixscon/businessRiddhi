import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key:
          process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
    });

    const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

    if (!bucketName) {
      return res.status(500).json({ error: "Bucket not configured" });
    }

    const bucket = storage.bucket(bucketName);

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "File parsing error" });
      }

      const fileCandidate = files["file"] || files.file;
      // formidable can return single file or array
      const file = Array.isArray(fileCandidate) ? fileCandidate[0] : fileCandidate;
      if (!file || typeof file.filepath !== "string") {
        return res.status(400).json({ error: "No file provided or invalid file type" });
      }

      const fileBuffer = fs.readFileSync(file.filepath);

      const fileName = `uploads/${Date.now()}-${file.originalFilename}`;

      await bucket.file(fileName).save(fileBuffer, {
        metadata: {
          contentType: file.mimetype || "application/octet-stream",
        },
      });

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      return res.status(200).json({ url: publicUrl });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Ensure this file is treated as a module
export {};