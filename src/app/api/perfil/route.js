export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const totalOcorrencias = await prisma.occurrence.count({
      where: { userId: 1 } 
    });

    const user = await prisma.user.findUnique({
      where: { id: 1 }
    });

    return NextResponse.json({ user, stats: { total: totalOcorrencias } });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar perfil" }, { status: 500 });
  }
}