# Relatorio de Validacao - BioGuard

Projeto: BioGuard - Sistema de Gestao de Fauna e Resgate Animal
Equipe: Sidney de Jesus F. de Freitas (2323783) e Leandro G. Nascimento (2326350)

---

## 1. Como Ocorreu a Validacao

| Campo | Informacao |
|-------|------------|
| Data | 15 de marco de 2026 |
| Formato | Reuniao presencial |
| Local | Cialne - Av. Presidente Costa e Silva, 2067, Fortaleza/CE |
| Participantes | Sidney F. de Freitas, Leandro G. Nascimento (UNIFOR) + Emanuel Carneiro, Gerente de TI (Cialne) |
| Duracao | Aproximadamente 1h30 |

---

## 2. Funcionalidades Apresentadas

- Login com autenticacao segura via e-mail e senha
- Dashboard com listagem de ocorrencias e filtro por status
- Formulario de registro com captura de GPS automatica
- Mapa interativo (Leaflet) com localizacao das ocorrencias
- Diretorio de instituicoes parceiras (ONGs, CCZs, Abrigos)
- Painel de estatisticas em tempo real (cards + grafico por especie)
- Perfil do colaborador com historico de registros
- Atualizacao de status (pendente, em andamento, concluido)

---

## 3. Feedback Recebido

Pontos positivos:
- Interface simples e intuitiva para uso em campo
- Captura de GPS automatica resolve o principal problema de localizacao
- Diretorio de instituicoes facilita o acionamento de ONGs e CCZ
- Dashboard com graficos facilita a visualizacao gerencial

Sugestoes de melhoria:
- Permitir envio de foto pelo celular no momento do registro
- Adicionar notificacao por WhatsApp ao registrar nova ocorrencia
- Criar relatorio exportavel em PDF para orgaos reguladores
- Separar perfis de acesso: colaborador, gestor e instituicao

---

## 4. Aprendizados Obtidos

- Usabilidade mobile-first validada como essencial
- GPS automatico foi o diferencial mais relevante para o parceiro
- Separacao de perfis reconhecida como necessaria para versao final
- Integracao com WhatsApp seria de alto impacto pratico

---

## 5. Ajustes Implementados

| Sugestao | Status | Observacao |
|----------|--------|------------|
| Foto pelo celular | Implementado | Campo foto_url no formulario de registro |
| Separacao de perfis | Parcial | Schema preve tipo_usuario; rotas separadas planejadas |
| Notificacao WhatsApp | Planejado | Fora do escopo atual; documentado para v2.0 |
| Relatorio PDF | Planejado | Fora do escopo atual; documentado para v2.0 |

---

## 6. Evidencias

- validation/evidence/reuniao_cialne_15032026.jpg
- validation/evidence/reuniao_cialne_15032026_2.jpeg
- validation/feedback/feedback_emanuel_carneiro.md
