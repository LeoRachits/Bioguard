import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const especies = await prisma.occurrence.groupBy({
      by: ['animal'],
      _count: { id: true }
    });

    const data = especies.map(item => ({
      name: item.animal || "Não Informado",
      value: item._count.id
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar espécies" }, { status: 500 });
  }
}