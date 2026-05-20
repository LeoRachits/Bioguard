// app/api/instituicoes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const instituicoes = await prisma.institution.findMany({
      orderBy: { nome: 'asc' }
    });
    
    return NextResponse.json(instituicoes);
  } catch (error) {
    console.error("Erro na API de instituições:", error);
    return NextResponse.json({ error: "Erro ao conectar ao banco" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nome, tipo, responsavel, local, telefone } = body;

    const novaInstituicao = await prisma.institution.create({
      data: {
        nome,
        tipo,
        responsavel,
        local,
        telefone,
        status_validacao: true,
      },
    });

    return NextResponse.json(novaInstituicao, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return NextResponse.json({ error: "Erro ao salvar no banco" }, { status: 500 });
  }
}