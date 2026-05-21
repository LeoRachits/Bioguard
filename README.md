# BioGuard — Sistema de Gestão de Fauna e Resgate Animal

**BioGuard** é uma plataforma Full Stack desenvolvida para a **Cialne** (empresa de avicultura, Fortaleza/CE) com o objetivo de monitorar e gerenciar ocorrências de animais (fauna silvestre ou domésticos) encontrados nas unidades da empresa. O sistema conecta colaboradores de campo a instituições de resgate (ONGs, CCZs e Abrigos) de forma ágil e rastreável.

> **Parceiro:** Cialne — Av. Presidente Costa e Silva, 2067, Fortaleza/CE
> **Responsável:** Emanuel Carneiro | Gerente de TI | (85) 99147-6677
> **ODS:** ODS 11 — Cidades e Comunidades Sustentáveis
> **Deploy:** https://bioguard-kohl.vercel.app

---

## Funcionalidades Principais

- **Autenticação Segura:** Login com cookie de sessão e proteção de rotas via Middleware
- **Dashboard Inteligente:** Painel com estatísticas em tempo real e gráficos de espécies (Recharts)
- **Registro de Ocorrências:** Formulário com captura de GPS, foto (câmera ou galeria) e descrição do animal
- **Mapa de Ocorrências:** Visualização geográfica dos registros via Leaflet
- **Diretório de Instituições:** Busca de parceiros com contato direto via WhatsApp
- **Perfil do Guardião:** Estatísticas individuais de cada colaborador
- **Interface Responsiva:** Adaptada para uso em smartphones em campo

---

## Deploy em Produção

| Item | Informação |
|------|-----------|
| **Sistema em produção** | https://bioguard-kohl.vercel.app |
| **Login de teste** | admin@cialne.com.br / 123 |
| **Repositório** | https://github.com/LeoRachits/Bioguard |

---

## Visão Geral da Arquitetura

O BioGuard adota o padrão **MVC adaptado ao Next.js (App Router)**:

- **View:** Componentes React com Tailwind CSS e Recharts
- **Controller:** API Routes do Next.js (pasta `src/app/api/`)
- **Model:** Prisma ORM com schema tipado (`prisma/schema.prisma`)
- **Banco:** PostgreSQL hospedado no Neon (cloud)

> Ver diagrama completo em [docs/architecture/architecture.md](docs/architecture/architecture.md)

---

## Como Executar o Projeto

### Pré-requisitos

- Node.js 18+
- Conta no Neon (https://neon.tech) — banco PostgreSQL cloud já configurado
- npm ou yarn

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/LeoRachits/Bioguard.git

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com sua DATABASE_URL do Neon

# 4. Gerar Prisma Client e executar seed
npx prisma generate
npx tsx prisma/seed.ts

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000
Login padrão: `admin@cialne.com.br` / `123`

---

## Documentação Técnica

| Documento | Caminho |
|-----------|---------|
| Requisitos Funcionais e Não-Funcionais | [docs/requirements/requirements.md](docs/requirements/requirements.md) |
| Arquitetura e Decisões Técnicas | [docs/architecture/architecture.md](docs/architecture/architecture.md) |
| Modelo de Banco de Dados | [docs/database/database_model.md](docs/database/database_model.md) |
| Especificação das APIs | [docs/api/api_documentation.md](docs/api/api_documentation.md) |

---

## Tecnologias e Ferramentas

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework Full Stack | Next.js (App Router) | 16.2.1 |
| Linguagem | JavaScript / TypeScript | ES6+ |
| Estilização | Tailwind CSS | 4.x |
| Gráficos | Recharts | 3.8.x |
| Mapa | Leaflet + React-Leaflet | 1.9.x |
| ORM | Prisma | 7.5.x |
| Banco de Dados | PostgreSQL (Neon cloud) | 15+ |
| Testes | Jest | — |
| Deploy | Vercel | — |
| Versionamento | Git + GitHub | — |

---

## Relação com o ODS 11

O BioGuard contribui diretamente com o **ODS 11 — Cidades e Comunidades Sustentáveis** da Agenda 2030 da ONU:

- **Meta 11.6:** Animais encontrados em ambiente industrial são encaminhados corretamente, sem soltura irregular
- **Meta 11.b:** O sistema cria um protocolo rastreável entre empresa, ONGs e órgãos públicos (CCZ)

---

## Evidências da Prática Extensionista

**Reunião presencial com o parceiro:**

- **Data:** 15 de março de 2026
- **Local:** Cialne — Av. Presidente Costa e Silva, 2067, Fortaleza/CE
- **Participantes:** Sidney de Jesus F. de Freitas, Leandro G. Nascimento (UNIFOR) + Emanuel Carneiro, Gerente de TI (Cialne)
- **Resultado:** Necessidades mapeadas, escopo validado, parceria firmada

![Reunião com Emanuel Carneiro na Cialne](validation/evidence/reuniao_cialne_15032026.jpg)

> Documentação completa em [validation/](validation/)

---

## Testes Automatizados

15 testes Jest em `backend/tests/`:

- `ocorrencias.test.js` — validação de status e campos (9 testes)
- `instituicoes.test.js` — validação de instituições por tipo (6 testes)

```bash
cd backend
npm test
```

---

## Autores

| Nome | Matrícula | Responsabilidades |
|------|-----------|-------------------|
| Leandro Gonçalves Nascimento | 2326350 | Back-end, Prisma ORM, API Routes, Deploy |
| Sidney de Jesus Felix de Freitas | 2323783 | Front-end, componentes React, design, API de stats |