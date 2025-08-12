import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (
    process.env.NEXT_PUBLIC_ENABLE_AI !== 'true' ||
    !process.env.OPENAI_API_KEY
  ) {
    return NextResponse.json({ error: 'AI disabled' }, { status: 403 });
  }
  const { word } = await req.json();
  return NextResponse.json({ example: `Example for ${word}` });
}
