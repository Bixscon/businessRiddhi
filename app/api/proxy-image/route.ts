// app/api/proxy-image/route.ts

// Force Node.js runtime so Edge runtime issues are avoided
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return new NextResponse('URL is required', { status: 400 });
  }

  try {
    // Validate the URL to prevent any security issues
    const urlObj = new URL(url);
    
    // Add a timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const imageResponse = await fetch(url, { 
      signal: controller.signal,
      // Add headers to help with CORS issues
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }).finally(() => clearTimeout(timeoutId));

    if (!imageResponse.ok) {
      return new NextResponse(`Failed to fetch image: ${imageResponse.statusText}`, { 
        status: imageResponse.status 
      });
    }
    
    // Validate that the response is actually an image
    const contentType = imageResponse.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      return new NextResponse('URL does not point to a valid image', { status: 400 });
    }
    const imageBuffer = await imageResponse.arrayBuffer();

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}
