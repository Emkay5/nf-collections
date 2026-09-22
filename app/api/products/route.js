import { NextResponse } from 'next/server';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newProduct = addProduct(body);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    const updated = updateProduct(id, updatedData);
    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
