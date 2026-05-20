export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  if (email === 'admin@cialne.com.br' && password === '123') {
    const cookieStore = await cookies();
    cookieStore.set('bioguard_token', 'true', {
      path: '/',
      maxAge: 3600,
      httpOnly: false,
      sameSite: 'lax',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
}