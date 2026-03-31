[api_specification.md](https://github.com/user-attachments/files/26364056/api_specification.md)
# Especificação das APIs — BioGuard

**Projeto:** BioGuard — Sistema de Gestão de Fauna e Resgate Animal  
**Parceiro:** Cialne | **Equipe:** Leandro G. Nascimento · Sidney J. F. de Freitas  
**Versão:** 1.0 | **Data:** Março de 2026  
**Base URL (desenvolvimento):** `http://localhost:3000`

---

## 1. Visão Geral dos Endpoints

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/login` | Autentica o usuário e gera cookie de sessão | Não |
| POST | `/api/logout` | Invalida o cookie de sessão | Não |
| GET | `/api/ocorrencias` | Lista todas as ocorrências | Sim |
| POST | `/api/ocorrencias` | Registra nova ocorrência | Sim |
| PATCH | `/api/ocorrencias/[id]` | Atualiza status de uma ocorrência | Sim |
| GET | `/api/instituicoes` | Lista todas as instituições parceiras | Sim |
| POST | `/api/instituicoes` | Cadastra nova instituição | Sim |
| GET | `/api/stats/home` | Retorna contagem de ocorrências por status | Sim |
| GET | `/api/stats/especies` | Retorna distribuição por espécie animal | Sim |
| GET | `/api/perfil` | Retorna dados e estatísticas do usuário logado | Sim |

---

## 2. Autenticação e Autorização

O BioGuard v1.0.4 utiliza **cookies de sessão HTTP** para autenticação.

**Fluxo de autenticação:**
1. Cliente envia `POST /api/login` com e-mail e senha
2. Servidor valida as credenciais
3. Em caso de sucesso, o servidor define o cookie `bioguard_token=true` com `maxAge: 3600` (1 hora)
4. O **Middleware do Next.js** intercepta todas as requisições subsequentes e verifica a presença do cookie
5. Se o cookie estiver ausente ou expirado, o usuário é redirecionado para `/login`

**Cookie de sessão:**
```
Nome:     bioguard_token
Valor:    true
Path:     /
MaxAge:   3600 (1 hora)
SameSite: lax
```

> **Nota para Etapa 2:** A autenticação será migrada para **JWT (JSON Web Token)** com perfis de acesso (`ADMIN`, `COLABORADOR`, `INSTITUICAO`), permitindo controle granular de permissões por rota.

---

## 3. Formato das Respostas

Todas as APIs retornam **JSON** (`Content-Type: application/json`).

**Resposta de erro padrão:**
```json
{
  "error": "Descrição do erro"
}
```

**Códigos de status utilizados:**

| Código | Significado |
|--------|------------|
| `200` | Sucesso — dados retornados |
| `201` | Criado — recurso criado com sucesso |
| `401` | Não autorizado — credenciais inválidas |
| `500` | Erro interno do servidor |

---

## 4. Detalhamento dos Endpoints

---

### 4.1 `POST /api/login` — Autenticação

Autentica o usuário e define o cookie de sessão.

**Request:**
```http
POST /api/login
Content-Type: application/json
```

```json
{
  "email": "admin@cialne.com.br",
  "password": "123"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `email` | string | Sim | E-mail do usuário cadastrado |
| `password` | string | Sim | Senha do usuário |

**Response — 200 OK (sucesso):**
```json
{
  "success": true
}
```
> O cookie `bioguard_token=true` é definido automaticamente na resposta.

**Response — 401 Unauthorized (credenciais inválidas):**
```json
{
  "error": "Credenciais inválidas"
}
```

---

### 4.2 `POST /api/logout` — Encerrar Sessão

Invalida o cookie de sessão do usuário.

**Request:**
```http
POST /api/logout
```

**Response — 200 OK:**
```json
{
  "success": true
}
```
> O cookie `bioguard_token` é sobrescrito com `maxAge: 0`, encerrando a sessão.

---

### 4.3 `GET /api/ocorrencias` — Listar Ocorrências

Retorna todas as ocorrências cadastradas, ordenadas da mais recente para a mais antiga, incluindo o nome do colaborador que registrou.

**Request:**
```http
GET /api/ocorrencias
Cookie: bioguard_token=true
```

**Response — 200 OK:**
```json
[
  {
    "id": 3,
    "animal": "Iguana",
    "porte": "Médio",
    "localizacao": "Área de Preservação Norte",
    "estado_aparente": "Animal dócil, sem ferimentos visíveis",
    "foto_url": null,
    "latitude": -3.7419,
    "longitude": -38.5434,
    "status": "concluido",
    "userId": 1,
    "institutionId": 1,
    "createdAt": "2026-03-20T14:00:00.000Z",
    "user": {
      "nome": "Leandro"
    }
  },
  {
    "id": 2,
    "animal": "Gato",
    "porte": "Pequeno",
    "localizacao": "Estacionamento Administrativo",
    "estado_aparente": "Filhote, aparentemente com fome",
    "foto_url": null,
    "latitude": -3.7318,
    "longitude": -38.5267,
    "status": "em andamento",
    "userId": 1,
    "institutionId": null,
    "createdAt": "2026-03-22T09:30:00.000Z",
    "user": {
      "nome": "Leandro"
    }
  }
]
```

---

### 4.4 `POST /api/ocorrencias` — Registrar Nova Ocorrência

Cria um novo registro de ocorrência no banco de dados.

**Request:**
```http
POST /api/ocorrencias
Content-Type: application/json
Cookie: bioguard_token=true
```

```json
{
  "animal": "Cão",
  "porte": "Médio",
  "localizacao": "Setor de Logística - Unidade 2",
  "estado_aparente": "Animal assustado, sem ferimentos visíveis",
  "latitude": -3.7318,
  "longitude": -38.5267
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `animal` | string | Sim | Espécie do animal (ex: "Cão", "Gato", "Ave", "Réptil") |
| `porte` | string | Sim | Porte do animal (ex: "Pequeno", "Médio", "Grande") |
| `localizacao` | string | Sim | Descrição textual do local onde o animal foi encontrado |
| `estado_aparente` | string | Sim | Descrição do estado físico e comportamental do animal |
| `latitude` | number | Não | Coordenada GPS — latitude decimal |
| `longitude` | number | Não | Coordenada GPS — longitude decimal |

**Response — 201 Created:**
```json
{
  "id": 4,
  "animal": "Cão",
  "porte": "Médio",
  "localizacao": "Setor de Logística - Unidade 2",
  "estado_aparente": "Animal assustado, sem ferimentos visíveis",
  "foto_url": null,
  "latitude": -3.7318,
  "longitude": -38.5267,
  "status": "pendente",
  "userId": 1,
  "institutionId": null,
  "createdAt": "2026-03-23T15:30:00.000Z"
}
```

**Response — 500 Internal Server Error:**
```json
{
  "error": "Erro interno"
}
```

---

### 4.5 `PATCH /api/ocorrencias/[id]` — Atualizar Status

Atualiza o status de uma ocorrência específica.

**Request:**
```http
PATCH /api/ocorrencias/4
Content-Type: application/json
Cookie: bioguard_token=true
```

```json
{
  "status": "concluido"
}
```

| Parâmetro de Rota | Tipo | Descrição |
|-------------------|------|-----------|
| `id` | integer | ID da ocorrência a ser atualizada |

| Campo do Body | Tipo | Valores Aceitos |
|---------------|------|----------------|
| `status` | string | `"pendente"`, `"em andamento"`, `"concluido"` |

**Response — 200 OK:**
```json
{
  "id": 4,
  "animal": "Cão",
  "porte": "Médio",
  "localizacao": "Setor de Logística - Unidade 2",
  "estado_aparente": "Animal assustado, sem ferimentos visíveis",
  "foto_url": null,
  "latitude": -3.7318,
  "longitude": -38.5267,
  "status": "concluido",
  "userId": 1,
  "institutionId": null,
  "createdAt": "2026-03-23T15:30:00.000Z"
}
```

---

### 4.6 `GET /api/instituicoes` — Listar Instituições

Retorna todas as instituições parceiras ordenadas alfabeticamente por nome.

**Request:**
```http
GET /api/instituicoes
Cookie: bioguard_token=true
```

**Response — 200 OK:**
```json
[
  {
    "id": 2,
    "nome": "Centro de Controle de Zoonoses",
    "tipo": "CCZ",
    "responsavel": "Carlos Jose",
    "local": "Caucaia - CE",
    "telefone": "(85) 97777-7777",
    "status_validacao": false
  },
  {
    "id": 1,
    "nome": "ONG Patinhas Felizes",
    "tipo": "ONG",
    "responsavel": "Ana Maria",
    "local": "Fortaleza - CE",
    "telefone": "(85) 98888-8888",
    "status_validacao": true
  }
]
```

---

### 4.7 `POST /api/instituicoes` — Cadastrar Instituição

Cadastra uma nova instituição parceira no sistema.

**Request:**
```http
POST /api/instituicoes
Content-Type: application/json
Cookie: bioguard_token=true
```

```json
{
  "nome": "Abrigo São Francisco",
  "tipo": "ABRIGO",
  "responsavel": "Maria Santos",
  "local": "Maracanaú - CE",
  "telefone": "(85) 96666-6666"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | string | Sim | Nome da instituição |
| `tipo` | string | Sim | Categoria: `"ONG"`, `"CCZ"` ou `"ABRIGO"` |
| `responsavel` | string | Não | Nome do responsável pelo contato |
| `local` | string | Sim | Cidade e estado (ex: "Fortaleza - CE") |
| `telefone` | string | Sim | Telefone/WhatsApp de contato |

**Response — 201 Created:**
```json
{
  "id": 3,
  "nome": "Abrigo São Francisco",
  "tipo": "ABRIGO",
  "responsavel": "Maria Santos",
  "local": "Maracanaú - CE",
  "telefone": "(85) 96666-6666",
  "status_validacao": true
}
```

---

### 4.8 `GET /api/stats/home` — Estatísticas da Home

Retorna a contagem de ocorrências agrupadas por status, para exibição nos cards da tela inicial.

**Request:**
```http
GET /api/stats/home
Cookie: bioguard_token=true
```

**Response — 200 OK:**
```json
{
  "pendente": 12,
  "em_andamento": 5,
  "concluido": 148
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `pendente` | integer | Total de ocorrências com status "pendente" |
| `em_andamento` | integer | Total de ocorrências com status "em andamento" |
| `concluido` | integer | Total de ocorrências com status "concluido" |

---

### 4.9 `GET /api/stats/especies` — Distribuição por Espécie

Retorna a distribuição de ocorrências agrupadas por espécie animal, para alimentar o gráfico Recharts da Home.

**Request:**
```http
GET /api/stats/especies
Cookie: bioguard_token=true
```

**Response — 200 OK:**
```json
[
  { "name": "Cão", "value": 45 },
  { "name": "Gato", "value": 38 },
  { "name": "Ave", "value": 12 },
  { "name": "Iguana", "value": 7 },
  { "name": "Não Informado", "value": 3 }
]
```

---

### 4.10 `GET /api/perfil` — Perfil do Usuário

Retorna os dados e estatísticas do usuário atualmente logado.

**Request:**
```http
GET /api/perfil
Cookie: bioguard_token=true
```

**Response — 200 OK:**
```json
{
  "user": {
    "id": 1,
    "nome": "Leandro",
    "email": "admin@cialne.com.br",
    "tipo_usuario": "ADMIN",
    "createdAt": "2026-03-25T20:00:00.000Z"
  },
  "stats": {
    "total": 165
  }
}
```

**Response — 500 Internal Server Error:**
```json
{
  "error": "Erro ao buscar perfil"
}
```
