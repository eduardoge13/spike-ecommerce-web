import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getUploadsDir } from '@/lib/uploads';

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

type MediaRouteContext = {
  params: Promise<{ file: string }>;
};

export async function GET(_request: Request, { params }: MediaRouteContext) {
  const { file } = await params;

  if (!file || file.includes('/') || file.includes('..')) {
    return new NextResponse('Not found', { status: 404 });
  }

  const extension = path.extname(file).toLowerCase();
  const contentType = CONTENT_TYPES[extension];

  if (!contentType) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(getUploadsDir(), file);

  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
