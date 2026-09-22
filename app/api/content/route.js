import { NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const content = getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = updateSiteContent(body);
    return NextResponse.json({ success: true, content: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
