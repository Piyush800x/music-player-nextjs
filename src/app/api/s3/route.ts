import { NextRequest, NextResponse } from 'next/server';
import { getMusicURL } from '../../../lib/aws'

export async function POST(req: NextRequest) {
  if (req.method != "POST") {
    return NextResponse.json({ message: 'Method Not Allowed'}, {status: 405});
  }
  const key = await req.json();
  console.log(`key: ${key}`)
  const url = await getMusicURL(key);
  return NextResponse.json({"url": url}, {status: 200})
}
