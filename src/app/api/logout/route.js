import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  
  // REMOÇÃO DE COOKIES PARA SAIR DA CONTA
  cookieStore.set('bioguard_token', '', {
    path: '/',
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}