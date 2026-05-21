export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  console.log("Recebendo requisição de ocorrência...");
  try {
    const body = await request.json();
    console.log("Dados recebidos:", body);

    const novaOcorrencia = await prisma.occurrence.create({
      data: {
        animal: body.animal,
        porte: body.porte,
        localizacao: body.localizacao,
        estado_aparente: body.estado_aparente,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
        foto_url: body.foto_url || null,
        status: 'pendente',
        userId: 1,
      },
    });

    console.log("Ocorrência salva no banco com sucesso!");
    return NextResponse.json(novaOcorrencia, { status: 201 });
  } catch (error) {
    console.error("ERRO CRÍTICO NO PRISMA:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const ocorrencias = await prisma.occurrence.findMany({
      include: {
        user: {
          select: { nome: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(ocorrencias);
  } catch (error) {
    console.error("Erro ao listar ocorrências:", error);
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
  }
}