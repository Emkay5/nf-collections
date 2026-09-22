import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE_NAME = 'nf_admin_session';
const SECRET_TOKEN = 'nf_secret_admin_session_token_2026';

export function verifyPassword(password) {
  return password === ADMIN_PASSWORD;
}

export async function setAdminSession() {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, SECRET_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === SECRET_TOKEN;
}
