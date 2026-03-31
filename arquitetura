# Arquitetura do Sistema — BioGuard

**Projeto:** BioGuard — Sistema de Gestão de Fauna e Resgate Animal  
**Parceiro:** Cialne | **Equipe:** Leandro G. Nascimento · Sidney J. F. de Freitas  
**Versão:** 1.0

---

## 1. Descrição da Arquitetura

O BioGuard adota uma arquitetura **MVC (Model-View-Controller) adaptada ao Next.js App Router**, combinando renderização do lado do servidor (SSR) e do lado do cliente (CSR) dentro de um único framework Full Stack.

A aplicação é estruturada em três camadas principais:

- **View (Apresentação):** Componentes React renderizados no navegador, com Tailwind CSS para estilização e Recharts/Leaflet para visualizações de dados
- **Controller (Lógica de Negócio):** API Routes do Next.js na pasta `src/app/api/`, responsáveis por receber requisições HTTP, aplicar regras de negócio e retornar respostas JSON
- **Model (Dados):** Prisma ORM como camada de abstração sobre o banco de dados PostgreSQL, com schema tipado e migrations versionadas

A autenticação é baseada em **cookies de sessão HTTP** gerenciados pelo próprio Next.js, com um Middleware que intercepta todas as requisições e valida o cookie antes de permitir o acesso às rotas protegidas.

---

## 2. Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (Browser / Mobile)                │
│                                                              │
│   ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐  │
│   │  Home    │  │ Dashboard │  │Diretório │  │  Admin   │  │
│   │ /page.js │  │/dashboard │  │/instit.  │  │/admin    │  │
│   └────┬─────┘  └─────┬─────┘  └────┬─────┘  └────┬─────┘  │
└────────┼──────────────┼──────────────┼──────────────┼────────┘
         │              │   HTTP / Cookie bioguard_token
┌────────▼──────────────▼──────────────▼──────────────▼────────┐
│                  NEXT.JS MIDDLEWARE                           │
│         Valida cookie → libera ou redireciona para /login    │
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                    API ROUTES (Controller)                     │
│                                                               │
│  POST /api/login      GET  /api/ocorrencias                   │
│  POST /api/logout     POST /api/ocorrencias                   │
│  GET  /api/perfil     PATCH /api/ocorrencias/[id]             │
│  GET  /api/stats/home GET  /api/instituicoes                  │
│  GET  /api/stats/especies  POST /api/instituicoes             │
└────────────────────────────┬──────────────────────────────────┘
                             │ Prisma Client
┌────────────────────────────▼──────────────────────────────────┐
│                    PRISMA ORM (Model)                         │
│              schema.prisma + migrations SQL                    │
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                    POSTGRESQL                                  │
│         Tabelas: "User", "Institution", "Occurrence"          │
└───────────────────────────────────────────────────────────────┘
```

---

## 3. Componentes do Sistema

### 3.1 Páginas (View)

| Rota | Arquivo | Descrição |
|------|---------|-----------|
| `/` | `src/app/page.js` | Home com KPIs em tempo real e gráfico de espécies |
| `/login` | `src/app/login/page.js` | Tela de autenticação |
| `/dashboard` | `src/app/dashboard/page.js` | Lista completa de ocorrências com mapa Leaflet |
| `/registrar` | `src/app/registrar/page.js` | Formulário de registro de nova ocorrência com GPS |
| `/instituicoes` | `src/app/instituicoes/page.js` | Diretório de instituições parceiras |
| `/instituicoes/[id]` | `src/app/instituicoes/[id]/page.js` | Perfil detalhado de uma instituição |
| `/admin` | `src/app/admin/page.js` | Painel Admin Master (empresas e instituições) |
| `/admin/instituicoes/nova` | `src/app/admin/instituicoes/nova/page.js` | Formulário de cadastro de nova instituição |
| `/perfil` | `src/app/perfil/page.js` | Perfil do colaborador logado |
| `/ocorrencias/[id]` | `src/app/ocorrencias/[id]/page.js` | Detalhes de uma ocorrência específica |

### 3.2 Componentes Reutilizáveis

| Componente | Localização | Função |
|-----------|-------------|--------|
| `StatusBadge` | `src/components/StatusBadge.js` | Badge colorido com o status da ocorrência |
| `EspeciesChart` | `src/components/EspeciesChart.js` | Gráfico de pizza de distribuição por espécie (Recharts) |
| `MapaOcorrencias` | `src/components/MapaOcorrencias.js` | Mapa interativo com pins de ocorrências (Leaflet) |
| `InstitutionCard` | `src/components/InstitutionCard.js` | Card de exibição de instituição no diretório |

### 3.3 API Routes (Controller)

| Método | Endpoint | Responsabilidade |
|--------|----------|-----------------|
| POST | `/api/login` | Valida credenciais e gera cookie de sessão |
| POST | `/api/logout` | Invalida o cookie de sessão |
| GET | `/api/ocorrencias` | Lista todas as ocorrências com dados do usuário |
| POST | `/api/ocorrencias` | Cria nova ocorrência no banco |
| PATCH | `/api/ocorrencias/[id]` | Atualiza status de uma ocorrência |
| GET | `/api/instituicoes` | Lista todas as instituições parceiras |
| POST | `/api/instituicoes` | Cadastra nova instituição |
| GET | `/api/stats/home` | Retorna contagem de ocorrências por status |
| GET | `/api/stats/especies` | Retorna distribuição de ocorrências por espécie |
| GET | `/api/perfil` | Retorna dados e estatísticas do usuário logado |

### 3.4 Modelo de Dados (Prisma)

Três entidades principais gerenciadas pelo Prisma ORM:
- **User** — colaboradores e administradores
- **Institution** — ONGs, CCZs e Abrigos parceiros
- **Occurrence** — registros de animais encontrados

> Detalhamento completo em [`docs/database/database_model.md`](../database/database_model.md)

---

## 4. Padrões Arquiteturais Utilizados

| Padrão | Aplicação no BioGuard |
|--------|----------------------|
| **MVC (Model-View-Controller)** | Separação clara entre componentes React (View), API Routes (Controller) e Prisma/PostgreSQL (Model) |
| **Mobile-First Design** | Interface construída a partir de breakpoints móveis, expandindo para desktop com classes responsivas do Tailwind CSS |
| **API RESTful** | Endpoints seguem convenções REST: verbos HTTP semânticos (GET, POST, PATCH), recursos identificados por URL (`/ocorrencias/[id]`), respostas em JSON |
| **Prototipagem Evolutiva** | Protótipo de alta fidelidade construído diretamente em código (sem etapas de wireframe intermediárias), evoluindo incrementalmente com feedback do parceiro |
| **Component-Based Architecture** | UI decomposta em componentes reutilizáveis e isolados em `src/components/`, promovendo reuso e fácil manutenção |
| **ORM Pattern** | Prisma como camada de abstração entre o código e o PostgreSQL, eliminando SQL manual e garantindo tipagem segura |

---

## 5. Decisões Técnicas e Justificativas

| Decisão | Justificativa |
|---------|---------------|
| **Next.js (App Router) como framework único** | Unifica frontend e backend em um único repositório e deployment, eliminando a necessidade de um servidor separado para a API. Reduz complexidade operacional para um projeto acadêmico com prazo definido. |
| **Prisma ORM sobre SQL puro** | Prisma gera tipos TypeScript automaticamente a partir do schema, eliminando erros de digitação em queries. As migrations versionadas garantem que o banco de dados evolua de forma controlada e reproduzível em qualquer ambiente. |
| **PostgreSQL como banco de dados** | Banco relacional maduro e gratuito com suporte nativo a constraints de integridade referencial (FK), necessárias para manter a consistência entre ocorrências, usuários e instituições. Compatível com PostGIS para expansão geoespacial na Etapa 2. |
| **Tailwind CSS para estilização** | Utility-first CSS elimina a criação de arquivos CSS separados, acelerando o desenvolvimento. Classes responsivas nativas facilitam o padrão Mobile-First exigido pelo uso em campo. |
| **Leaflet + React-Leaflet para mapas** | Biblioteca open-source consolidada, sem custo de API. Renderiza mapas de tiles (OpenStreetMap) com marcadores de localização das ocorrências, usando as coordenadas GPS já capturadas pelo formulário de registro. |
| **Recharts para gráficos** | Biblioteca de gráficos construída especificamente para React, com componentes declarativos e sem dependências externas pesadas. Ideal para o gráfico de pizza de distribuição por espécie. |
| **Cookies de sessão (v1.0.4)** | Na versão atual (Etapa 1), o cookie simples satisfaz o requisito de proteção de rotas com implementação mínima. A migração para JWT com perfis na Etapa 2 está planejada e o schema já prevê o campo `tipo_usuario` para suportá-la. |
