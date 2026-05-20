import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const contagem = await prisma.occurrence.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    const stats = {
      pendente: contagem.find(c => c.status === 'pendente')?._count.id || 0,
      em_andamento: contagem.find(c => c.status === 'em andamento')?._count.id || 0,
      concluido: contagem.find(c => c.status === 'concluido')?._count.id || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao gerar estatísticas" }, { status: 500 });
  }
}