🐾 BioGuard — Sistema de Gestão de Fauna e Resgate Animal
O BioGuard é uma plataforma Full Stack desenvolvida para a Cialne com o objetivo de monitorar e gerenciar ocorrências de animais (fauna silvestre ou domésticos) encontrados nas unidades da empresa. O sistema conecta colaboradores de campo a instituições de resgate (ONGs, Clínicas e CCZ) de forma ágil e segura.

🚀 Funcionalidades Principais

🔐 Autenticação Segura: Sistema de login com cookies e proteção de rotas via Middleware.
📊 Dashboard Inteligente: Painel com estatísticas em tempo real e gráficos de distribuição por espécie (Recharts).
📝 Registro de Ocorrências: Formulário com captura de GPS, fotos e descrição do estado do animal.
🔔 Notificações em Tempo Real: Sino de alertas que notifica novos registros e permite acesso direto ao caso.
📂 Diretório de Instituições: Busca filtrada de parceiros com botão de contato direto via WhatsApp.
👤 Perfil do Guardião: Estatísticas individuais de cada colaborador e gestão de conta.
📱 Interface Responsiva: Totalmente adaptado para uso em smartphones por colaboradores em campo.


🔧 Como Executar o Projeto

Clonar o repositório:

bashgit clone https://github.com/seu-usuario/bioguard.git

📚 Documentação Técnica

1. Requisitos Funcionais (RF) e Não-Funcionais (RNF)
Requisitos Funcionais:

RF01 (Login): O sistema autentica usuários corporativos.
RF02 (Registro): O sistema permite registrar ocorrências com coordenadas geográficas.
RF03 (Diretório): O sistema lista instituições parceiras filtradas por tipo.

Requisitos Não-Funcionais:

RNF01 (Segurança): As rotas internas são protegidas por Middleware, utilizando sessão via HTTP-Only Cookies.
RNF02 (Responsividade): A interface segue o padrão Mobile-First para uso em smartphones de campo.


2. Arquitetura do Sistema

Padrão: MVC (Model-View-Controller) adaptado ao Next.js.
Client-Side: React com hooks (useState, useEffect) para interatividade.
Server-Side: API Routes do Next.js responsáveis pela lógica de negócio e segurança.
Camada de Dados: Prisma ORM como ponte entre o código e o banco de dados PostgreSQL.


3. Modelo de Banco de Dados (Diagrama ER)
O diagrama pode ser elaborado no Lucidchart ou dbdiagram.io com as seguintes entidades:

User: id, nome, email, senha, tipo_usuario
Institution: id, nome, tipo, responsavel, local, telefone, status_validacao
Occurrence: id, animal, porte, localizacao, latitude, longitude, estado_aparente, status, userId (FK), institutionId (FK)


4. Protótipos de Interface
As capturas de tela obtidas durante o desenvolvimento ilustram as telas do sistema. A paleta de cores adotada é composta pelo Azul Cialne (#004A8D) e Amarelo (#FFD100). A interface utiliza componentes reutilizáveis como StatusBadge e InstitutionCard.
O projeto adotou a metodologia de Prototipagem Evolutiva, na qual o protótipo de alta fidelidade foi construído diretamente em código (CSS/Tailwind), eliminando etapas intermediárias e otimizando o tempo de desenvolvimento.

5. Documentação de APIs
MétodoEndpointDescriçãoPOST/api/loginAutentica o usuário e gera o cookie de sessão.GET/api/ocorrenciasLista todas as ocorrências para o Dashboard.POST/api/ocorrenciasCria um novo registro via mobile.PATCH/api/ocorrencias/[id]Atualiza o status da ocorrência (Pendente/Concluído).

6. Tecnologias e Ferramentas

Linguagem: JavaScript (ES6+)
Frontend: Next.js (App Router), Tailwind CSS, Recharts, Lucide React
Backend: Next.js API Routes
Banco de Dados: PostgreSQL
ORM: Prisma
Ambiente de Desenvolvimento: VS Code, Git e GitHub


7. Estrutura de Testes

Testes de Unidade: Validam se o cálculo de estatísticas do gráfico está correto.
Testes de Integração: Verificam se o registro de ocorrência é salvo corretamente no banco de dados.
Testes de Usabilidade: Simulam o uso em campo com captura real de GPS no celular.

Autores:
 Leandro Gonçakves Nascimento - matricula 2326350, 
 Sidney Jesus felix de Freitas - matricula 2323783

Responsabilidades:
Leandro: back-end, integração
Sidney, Front-end, API
