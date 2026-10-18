import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    mode: 'static',
    message: 'Motion Cue operates as a 100% client-side static lookup dictionary.',
  });
}
