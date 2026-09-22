import { NextResponse } from 'next/server';
import { getMessages, addMessage, updateMessageStatus, deleteMessage } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const messages = getMessages();
  return NextResponse.json(messages);
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 });
    }
    const newMsg = addMessage(body);
    return NextResponse.json({ success: true, message: 'Message sent successfully', data: newMsg });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function PUT(request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    const updated = updateMessageStatus(id, status);
    return NextResponse.json({ success: true, message: updated });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update message status' }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: 'Message ID required' }, { status: 400 });
    deleteMessage(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
