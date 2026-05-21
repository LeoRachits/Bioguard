# ðŸ¾ BioGuard â€” Sistema de GestÃ£o de Fauna e Resgate Animal

**BioGuard** Ã© uma plataforma Full Stack desenvolvida para a **Cialne** (empresa de avicultura, Fortaleza/CE) com o objetivo de monitorar e gerenciar ocorrÃªncias de animais (fauna silvestre ou domÃ©sticos) encontrados nas unidades da empresa. O sistema conecta colaboradores de campo a instituiÃ§Ãµes de resgate (ONGs, CCZs e Abrigos) de forma Ã¡gil e rastreÃ¡vel.

> **Parceiro:** Cialne â€” Av. Presidente Costa e Silva, 2067, Fortaleza/CE  
> **ResponsÃ¡vel:** Emanuel Carneiro | Gerente de TI | (85) 99147-6677  
> **ODS:** ODS 11 â€” Cidades e Comunidades SustentÃ¡veis  
> **VersÃ£o:** v1.0.4 â€” Em operaÃ§Ã£o local  

---

## ðŸš€ Funcionalidades Principais

- ðŸ” **AutenticaÃ§Ã£o Segura:** Login com cookie de sessÃ£o e proteÃ§Ã£o de rotas via Middleware
- ðŸ“Š **Dashboard Inteligente:** Painel com estatÃ­sticas em tempo real e grÃ¡ficos de espÃ©cies (Recharts)
- ðŸ“ **Registro de OcorrÃªncias:** FormulÃ¡rio com captura de GPS, foto e descriÃ§Ã£o do animal
- ðŸ—ºï¸ **Mapa de OcorrÃªncias:** VisualizaÃ§Ã£o geogrÃ¡fica dos registros via Leaflet
- ðŸ“‚ **DiretÃ³rio de InstituiÃ§Ãµes:** Busca de parceiros com contato direto via WhatsApp
- ðŸ‘¤ **Perfil do GuardiÃ£o:** EstatÃ­sticas individuais de cada colaborador
- ðŸ“± **Interface Responsiva:** Adaptada para uso em smartphones em campo

---

## ðŸ—ï¸ VisÃ£o Geral da Arquitetura

O BioGuard adota o padrÃ£o **MVC adaptado ao Next.js (App Router)**:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              CLIENTES                        â”‚
â”‚   Navegador Web / Smartphone (Mobile-First) â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
               â”‚ HTTP / Cookie de SessÃ£o
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚           NEXT.JS (App Router)               â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”‚
â”‚  â”‚  React Pages â”‚   â”‚   API Routes        â”‚ â”‚
â”‚  â”‚  (View/UI)   â”‚   â”‚   (Controller)      â”‚ â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                  â”‚ Prisma ORM
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              PostgreSQL                       â”‚
â”‚   Tabelas: User, Institution, Occurrence     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Camadas:**
- **View:** Componentes React com Tailwind CSS e Recharts
- **Controller:** API Routes do Next.js (pasta `src/app/api/`)
- **Model:** Prisma ORM com schema tipado (`prisma/schema.prisma`)
- **Dados:** PostgreSQL hospedado localmente

> Ver diagrama completo em [`docs/architecture/architecture.md`](docs/architecture/architecture.md)

---

## ðŸ”§ Como Executar o Projeto

### PrÃ©-requisitos
- Node.js 18+
- PostgreSQL rodando localmente
- npm ou yarn

### InstalaÃ§Ã£o

```bash
# 1. Clonar o repositÃ³rio
git clone https://github.com/LeoRachits/Bioguard.git

# 2. Instalar dependÃªncias
npm install

# 3. Configurar variÃ¡veis de ambiente
cp .env.example .env
# Edite o .env com sua DATABASE_URL

# 4. Executar migrations e seed
npx prisma migrate deploy
npx prisma db seed

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)  
Login padrÃ£o: `admin@cialne.com.br` / `123`

---

## ðŸ“š DocumentaÃ§Ã£o TÃ©cnica Completa

| Documento | Caminho |
|-----------|---------|
| Requisitos Funcionais e NÃ£o-Funcionais | [`docs/requirements/requirements.md`](docs/requirements/requirements.md) |
| Arquitetura e DecisÃµes TÃ©cnicas | [`docs/architecture/architecture.md`](docs/architecture/architecture.md) |
| Modelo de Banco de Dados | [`docs/database/database_model.md`](docs/database/database_model.md) |
| EspecificaÃ§Ã£o das APIs | [`docs/api/api_documentation.md`](docs/api/api_documentation.md) |

---

## ðŸ› ï¸ Tecnologias e Ferramentas

| Camada | Tecnologia | VersÃ£o |
|--------|-----------|--------|
| Framework Full Stack | Next.js (App Router) | 16.2.1 |
| Linguagem | JavaScript / TypeScript | ES6+ |
| EstilizaÃ§Ã£o | Tailwind CSS | 4.x |
| GrÃ¡ficos | Recharts | 3.8.x |
| Mapa | Leaflet + React-Leaflet | 1.9.x |
| Ãcones | Lucide React | 1.0.x |
| ORM | Prisma | 7.5.x |
| Banco de Dados | PostgreSQL | 15+ |
| Runtime | Node.js | 18+ |
| Versionamento | Git + GitHub | â€” |

---

## ðŸ“… Cronograma â€” Etapa 2 (N708)

A Etapa 2 contempla o desenvolvimento completo e a integraÃ§Ã£o de todas as funcionalidades planejadas. Prazo total: **14 semanas**.

| Fase | Semanas | Atividades | EntregÃ¡vel |
|------|---------|------------|------------|
| Fase 1 | Sem. 1â€“2 | RefatoraÃ§Ã£o do ambiente, Docker, autenticaÃ§Ã£o JWT real por perfil | Ambiente dockerizado, auth completa |
| Fase 2 | Sem. 2â€“3 | ImplementaÃ§Ã£o dos perfis de acesso (Colaborador, Gestor, ONG, Admin) com middleware | Controle de acesso por perfil funcional |
| Fase 3 | Sem. 3â€“5 | API completa de ocorrÃªncias com upload de foto e validaÃ§Ãµes | Endpoints /ocorrencias completos com testes |
| Fase 4 | Sem. 5â€“6 | App Mobile (React Native) para registro em campo com GPS e cÃ¢mera | App mobile funcional |
| Fase 5 | Sem. 6â€“8 | Acionamento automÃ¡tico de ONGs, notificaÃ§Ãµes push (FCM) | Sistema de notificaÃ§Ãµes funcional |
| Fase 6 | Sem. 8â€“9 | Chat em tempo real (WebSocket) entre colaborador e ONG | Chat funcional dentro da ocorrÃªncia |
| Fase 7 | Sem. 9â€“11 | PainÃ©is Web completos: Gestor, Admin Master, ONG | Interfaces integradas Ã  API |
| Fase 8 | Sem. 11â€“12 | ExportaÃ§Ã£o de relatÃ³rios PDF/CSV com filtros | RelatÃ³rios mensais exportÃ¡veis |
| Fase 9 | Sem. 12â€“13 | Testes unitÃ¡rios (Jest), integraÃ§Ã£o (Supertest) e E2E (Cypress) | Cobertura de testes > 70% |
| Fase 10 | Sem. 13â€“14 | Deploy em produÃ§Ã£o, CI/CD, ajustes com a Cialne e documentaÃ§Ã£o final | Sistema em produÃ§Ã£o entregue Ã  Cialne |

---

## ðŸŒ RelaÃ§Ã£o com o ODS 11

O BioGuard contribui diretamente com o **ODS 11 â€” Cidades e Comunidades SustentÃ¡veis** da Agenda 2030 da ONU:

- **Meta 11.6:** Reduzir o impacto ambiental negativo per capita das cidades â€” animais encontrados em ambiente industrial sÃ£o encaminhados corretamente, sem soltura irregular
- **Meta 11.b:** Fomentar polÃ­ticas integradas de gestÃ£o de risco â€” o sistema cria um protocolo rastreÃ¡vel entre empresa, ONGs e Ã³rgÃ£os pÃºblicos (CCZ)
- **Responsabilidade Social Corporativa:** RelatÃ³rios exportÃ¡veis permitem Ã  Cialne evidenciar suas aÃ§Ãµes ambientais Ã  diretoria e a Ã³rgÃ£os reguladores

---

## ðŸ¤ EvidÃªncias da PrÃ¡tica Extensionista

**ReuniÃ£o presencial com o parceiro:**
- **Data:** 15 de marÃ§o de 2026
- **Local:** Cialne â€” Av. Presidente Costa e Silva, 2067, Fortaleza/CE
- **Participantes:** Sidney de Jesus F. de Freitas, Leandro G. Nascimento (equipe UNIFOR) + Emanuel Carneiro, Gerente de TI (Cialne)
- **Pauta:** Levantamento de requisitos, identificaÃ§Ã£o do problema de animais errantes nas dependÃªncias e validaÃ§Ã£o da proposta do BioGuard
- **Resultado:** Necessidades mapeadas, escopo validado, termo de parceria firmado

![ReuniÃ£o com Emanuel Carneiro na Cialne](validation/evidence/reuniao_cialne_15032026.jpg)

---

## ðŸ‘¥ Autores


| Leandro GonÃ§alves Nascimento | 2326350 | Back-end, integraÃ§Ã£o com banco de dados, Prisma ORM, API Routes |
| Sidney de Jesus Felix de Freitas | 2323783 | Front-end, componentes React, design de interface, API de stats |



