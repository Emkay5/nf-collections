import { NextResponse } from 'next/server';
import { getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const gallery = getGallery();
  return NextResponse.json(gallery);
}

export async function POST(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newItem = addGalleryItem(body);
    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add gallery item' }, { status: 500 });
  }
}

export async function PUT(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updatedData } = body;
    if (!id) return NextResponse.json({ error: 'Item ID required' }, { status: 400 });
    const updated = updateGalleryItem(id, updatedData);
    return NextResponse.json({ success: true, item: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Item ID required' }, { status: 400 });
    deleteGalleryItem(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
