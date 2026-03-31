# Modelo de Banco de Dados — BioGuard

**Projeto:** BioGuard — Sistema de Gestão de Fauna e Resgate Animal  
**Parceiro:** Cialne | **Equipe:** Leandro G. Nascimento · Sidney J. F. de Freitas  
**Versão:** 1.0 | **Data:** Março de 2026  
**Banco:** PostgreSQL | **ORM:** Prisma 7.5.x

---

## 1. Modelo de Dados

O banco de dados do BioGuard é **relacional** e composto por **3 entidades principais**, gerenciadas pelo Prisma ORM com schema tipado e migrations SQL versionadas.

```
┌─────────────────────┐         ┌──────────────────────────────────┐
│        User         │         │           Occurrence              │
├─────────────────────┤         ├──────────────────────────────────┤
│ id          INT  PK │◄────────│ userId       INT  FK (NOT NULL)  │
│ nome        TEXT    │  1 : N  │ id           INT  PK             │
│ email       TEXT    │         │ animal       TEXT NOT NULL        │
│ senha       TEXT    │         │ porte        TEXT NOT NULL        │
│ tipo_usuario TEXT   │         │ localizacao  TEXT NOT NULL        │
│ createdAt   DATE    │         │ estado_apar. TEXT NOT NULL        │
└─────────────────────┘         │ foto_url     TEXT NULL           │
                                │ latitude     FLOAT NULL          │
                                │ longitude    FLOAT NULL          │
┌─────────────────────┐         │ status       TEXT DEFAULT pend.  │
│     Institution     │         │ institutionId INT FK NULL         │
├─────────────────────┤         │ createdAt    DATE                │
│ id          INT  PK │◄── N:1 ─│                                  │
│ nome        TEXT    │         └──────────────────────────────────┘
│ tipo        TEXT    │
│ responsavel TEXT?   │
│ local       TEXT    │
│ telefone    TEXT    │
│ status_val. BOOL    │
└─────────────────────┘
```

**Relacionamentos:**
- **User → Occurrence:** 1 usuário pode registrar N ocorrências (`ON DELETE RESTRICT`)
- **Institution → Occurrence:** 1 instituição pode ser vinculada a N ocorrências (`ON DELETE SET NULL` — a ocorrência é preservada se a instituição for removida)

---

## 2. Descrição das Entidades e Relacionamentos

### 2.1 Entidade: `User`

Representa os usuários do sistema — colaboradores, gestores e administradores da Cialne.

**Relacionamentos:**
- `User` tem N `Occurrence` (um colaborador pode registrar múltiplas ocorrências)
- Restrição: um `User` não pode ser excluído se possuir `Occurrence` vinculadas (`RESTRICT`)

### 2.2 Entidade: `Institution`

Representa as instituições parceiras cadastradas no sistema: ONGs, Centros de Controle de Zoonoses (CCZ) e Abrigos.

**Relacionamentos:**
- `Institution` pode estar vinculada a N `Occurrence`
- Se uma `Institution` for excluída, as `Occurrence` vinculadas têm seu `institutionId` definido como `NULL` (`SET NULL`)

### 2.3 Entidade: `Occurrence`

Entidade central do sistema. Registra cada ocorrência de animal encontrado nas dependências da Cialne.

**Relacionamentos:**
- Pertence a 1 `User` (colaborador que registrou) — obrigatório (`NOT NULL`)
- Pode estar vinculada a 1 `Institution` (instituição acionada) — opcional (`NULL`)

---

## 3. Diagrama ER — Detalhado

```
User                          Occurrence                    Institution
────────────────              ─────────────────────         ─────────────────────
id           INT PK ◄─────── userId      INT FK NN │  ┌── institutionId INT FK?
nome         TEXT NN         id          INT PK     │  │   id           INT PK
email        TEXT NN UNIQUE  animal      TEXT NN    │  │   nome         TEXT NN
senha        TEXT NN         porte       TEXT NN    │  │   tipo         TEXT NN
tipo_usuario TEXT NN         localizacao TEXT NN    │  │   responsavel  TEXT
createdAt    TIMESTAMP NN    estado_ap.  TEXT NN    │  │   local        TEXT NN
                             foto_url    TEXT        │  │   telefone     TEXT NN
                             latitude    FLOAT       │  │   status_val.  BOOL
                             longitude   FLOAT       │  │   (default: F)
                             status      TEXT        │  └──►
                             (default: pendente)    │
                             institutionId INT FK?──┘
                             createdAt   TIMESTAMP NN

Cardinalidades:
User    ||──o{ Occurrence : "registra"
Institution ||──o{ Occurrence : "atende"
```

**Legenda:**
- `PK` — Chave primária
- `FK` — Chave estrangeira
- `NN` — NOT NULL
- `?` — Nullable (campo opcional)
- `||──o{` — Um para muitos (obrigatório no lado "um")

---

## 4. Dicionário de Dados

### Tabela: `User`

| Campo | Tipo SQL | Tipo Prisma | Restrições | Valores Aceitos | Descrição |
|-------|----------|-------------|------------|-----------------|-----------|
| `id` | `SERIAL` | `Int` | PK, NOT NULL, AUTO | Inteiros positivos | Identificador único auto-incremental do usuário |
| `nome` | `TEXT` | `String` | NOT NULL | Qualquer string | Nome completo do usuário |
| `email` | `TEXT` | `String` | NOT NULL, UNIQUE | Formato e-mail válido | E-mail de acesso ao sistema — único por usuário |
| `senha` | `TEXT` | `String` | NOT NULL | Qualquer string | Senha do usuário (v1.0.4: texto puro; Etapa 2: hash bcrypt) |
| `tipo_usuario` | `TEXT` | `String` | NOT NULL | `ADMIN`, `COLABORADOR`, `INSTITUICAO` | Perfil de acesso do usuário no sistema |
| `createdAt` | `TIMESTAMP(3)` | `DateTime` | NOT NULL, DEFAULT NOW() | Data/hora ISO 8601 | Data e hora de criação do cadastro |

### Tabela: `Institution`

| Campo | Tipo SQL | Tipo Prisma | Restrições | Valores Aceitos | Descrição |
|-------|----------|-------------|------------|-----------------|-----------|
| `id` | `SERIAL` | `Int` | PK, NOT NULL, AUTO | Inteiros positivos | Identificador único auto-incremental da instituição |
| `nome` | `TEXT` | `String` | NOT NULL | Qualquer string | Nome da instituição parceira |
| `tipo` | `TEXT` | `String` | NOT NULL | `ONG`, `CCZ`, `ABRIGO` | Categoria da instituição para filtro no diretório |
| `responsavel` | `TEXT` | `String?` | NULL permitido | Qualquer string | Nome do responsável pelo contato na instituição |
| `local` | `TEXT` | `String` | NOT NULL | Qualquer string | Cidade e estado da instituição (ex: "Fortaleza - CE") |
| `telefone` | `TEXT` | `String` | NOT NULL | Qualquer string | Número de telefone/WhatsApp para contato |
| `status_validacao` | `BOOLEAN` | `Boolean` | NOT NULL, DEFAULT false | `true` / `false` | Indica se a instituição foi validada pelo Admin e aparece no diretório |

### Tabela: `Occurrence`

| Campo | Tipo SQL | Tipo Prisma | Restrições | Valores Aceitos | Descrição |
|-------|----------|-------------|------------|-----------------|-----------|
| `id` | `SERIAL` | `Int` | PK, NOT NULL, AUTO | Inteiros positivos | Identificador único auto-incremental da ocorrência |
| `animal` | `TEXT` | `String` | NOT NULL | Ex: "Cão", "Gato", "Ave" | Espécie do animal encontrado |
| `porte` | `TEXT` | `String` | NOT NULL | Ex: "Pequeno", "Médio", "Grande" | Porte físico do animal |
| `localizacao` | `TEXT` | `String` | NOT NULL | Qualquer string | Descrição textual do local (ex: "Setor de Logística - Unidade 2") |
| `estado_aparente` | `TEXT` | `String` | NOT NULL | Qualquer string | Descrição do estado físico e comportamental do animal |
| `foto_url` | `TEXT` | `String?` | NULL permitido | URL relativa ou absoluta | Caminho da foto do animal armazenada no servidor |
| `latitude` | `DOUBLE PRECISION` | `Float?` | NULL permitido | Valores entre -90 e 90 | Latitude GPS do local do achado |
| `longitude` | `DOUBLE PRECISION` | `Float?` | NULL permitido | Valores entre -180 e 180 | Longitude GPS do local do achado |
| `status` | `TEXT` | `String` | NOT NULL, DEFAULT 'pendente' | `pendente`, `em andamento`, `concluido` | Status atual do atendimento da ocorrência |
| `userId` | `INTEGER` | `Int` | FK → User.id, NOT NULL, RESTRICT | Inteiros positivos | ID do usuário (colaborador) que registrou a ocorrência |
| `institutionId` | `INTEGER` | `Int?` | FK → Institution.id, NULL, SET NULL | Inteiros positivos ou NULL | ID da instituição acionada para atender (opcional) |
| `createdAt` | `TIMESTAMP(3)` | `DateTime` | NOT NULL, DEFAULT NOW() | Data/hora ISO 8601 | Data e hora do registro da ocorrência |

---

## 5. Script SQL de Criação (Migration)

```sql
-- Migration: 20260325200013_init_bioguard

CREATE TABLE "User" (
    "id"           SERIAL NOT NULL,
    "nome"         TEXT NOT NULL,
    "email"        TEXT NOT NULL,
    "senha"        TEXT NOT NULL,
    "tipo_usuario" TEXT NOT NULL,
    "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Institution" (
    "id"               SERIAL NOT NULL,
    "nome"             TEXT NOT NULL,
    "tipo"             TEXT NOT NULL,
    "local"            TEXT NOT NULL,
    "telefone"         TEXT NOT NULL,
    "status_validacao" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Occurrence" (
    "id"              SERIAL NOT NULL,
    "animal"          TEXT NOT NULL,
    "porte"           TEXT NOT NULL,
    "localizacao"     TEXT NOT NULL,
    "estado_aparente" TEXT NOT NULL,
    "foto_url"        TEXT,
    "latitude"        DOUBLE PRECISION,
    "longitude"       DOUBLE PRECISION,
    "status"          TEXT NOT NULL DEFAULT 'pendente',
    "userId"          INTEGER NOT NULL,
    "institutionId"   INTEGER,
    "createdAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Occurrence_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

ALTER TABLE "Occurrence"
    ADD CONSTRAINT "Occurrence_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Occurrence"
    ADD CONSTRAINT "Occurrence_institutionId_fkey"
    FOREIGN KEY ("institutionId") REFERENCES "Institution"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

-- Migration: 20260325210531_add_responsavel
ALTER TABLE "Institution" ADD COLUMN "responsavel" TEXT;
```
