import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});
async function main() {
  console.log('🌱 Iniciando sementeira de dados...');

  await prisma.user.upsert({
    where: { email: 'admin@cialne.com.br' },
    update: {},
    create: {
      nome: 'Leandro',
      email: 'admin@cialne.com.br',
      senha: '123',
      tipo_usuario: 'ADMIN',
    },
  });

  await prisma.institution.createMany({
    data: [
      {
        nome: 'ONG Patinhas Felizes',
        tipo: 'ONG',
        responsavel: 'Ana Maria',
        local: 'Fortaleza - CE',
        telefone: '(85) 98888-8888',
        status_validacao: true,
      },
      {
        nome: 'Centro de Controle de Zoonoses',
        tipo: 'CCZ',
        responsavel: 'Carlos Jose',
        local: 'Caucaia - CE',
        telefone: '(85) 97777-7777',
        status_validacao: false,
      },
    ],
  });

  console.log('✅ Banco de dados povoado!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });