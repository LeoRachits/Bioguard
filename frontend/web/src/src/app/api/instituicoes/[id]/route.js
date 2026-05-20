import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const instituicao = await prisma.institution.findUnique({
      where: { id: Number(id) }
    });

    if (!instituicao) {
      return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
    }

    return NextResponse.json(instituicao);
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}