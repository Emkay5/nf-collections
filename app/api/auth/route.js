import { NextResponse } from 'next/server';
import { verifyPassword, setAdminSession, clearAdminSession, isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(request) {
  try {
    const { password } = await request.json();
    if (verifyPassword(password)) {
      await setAdminSession();
      return NextResponse.json({ success: true, message: 'Logged in successfully' });
    }
    return NextResponse.json({ success: false, message: 'Incorrect admin password' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
