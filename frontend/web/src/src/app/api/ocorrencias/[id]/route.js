import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const ocorrencia = await prisma.occurrence.findUnique({
      where: { id: parseInt(id) },
      include: { 
        user: {
          select: { nome: true }
        }
      }
    });

    if (!ocorrencia) {
      return NextResponse.json({ error: "Ocorrência não encontrada" }, { status: 404 });
    }

    return NextResponse.json(ocorrencia);
  } catch (error) {
    console.error("Erro na API de detalhes:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}