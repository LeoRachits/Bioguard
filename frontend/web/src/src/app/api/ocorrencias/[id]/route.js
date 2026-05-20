import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const ocorrencia = await prisma.occurrence.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, institution: true },
    });

    if (!ocorrencia) {
      return NextResponse.json({ error: 'Ocorrência não encontrada' }, { status: 404 });
    }

    return NextResponse.json(ocorrencia);
  } catch (error) {
    console.error('Erro ao buscar ocorrência:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, institutionId, notes } = body;

    const ocorrencia = await prisma.occurrence.update({
      where: { id: parseInt(id) },
      data: {
        ...(status && { status }),
        ...(institutionId && { institutionId: parseInt(institutionId) }),
        ...(notes && { notes }),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(ocorrencia);
  } catch (error) {
    console.error('Erro ao atualizar ocorrência:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.occurrence.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar ocorrência:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}