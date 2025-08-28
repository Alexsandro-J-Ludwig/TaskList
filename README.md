# Backend - TodoList API

Este repositório contém o backend da aplicação **TodoList**, responsável por gerenciar usuários e tarefas, implementado em **Node.js** com **Express** e **PostgreSQL**. 

---

## 🛠 Tecnologias

- Node.js
- Express.js
- PostgreSQL
- JWT para autenticação
- dotenv para variáveis de ambiente
- Vite + React (frontend separado)

---

## ⚡ Funcionalidades

- CRUD de usuários
- CRUD de tarefas
- Validação de tarefas duplicadas
- Regras de negócio:
  - Evita criar tarefas duplicadas com mesmo status
  - Permite atualização parcial de tarefas
- Autenticação via JWT
- Middleware para proteção de rotas

---

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Alexsandro-J-Ludwig/TaskList
```

2. Instale as dependências:
```bash
npm i dotenv cors express pg jsonwebtoken bcrypt
```

3. Crie um arquivo `.env` com as variáveis de ambiente necessárias:
```bash
DB_USER=<seu_usuário>
DB_HOST=localhost
DB_NAME=<seu_banco_de_dados>
DB_PASSWORD=<sua_senha_do_banco>
DB_PORT=5432    
SJWT=<chave_secreta_para_gerar_token>
```
4. Inicialize seu banco de dados e rode o seguinte comando em ```QUERY TOOL```:
```bash
CREATE DATABAE <nome_do_banco>

CREATE TABLE users(
    ID SERIAL PRIMARY KEY,
    USERNAME VARCHAR(50) NOT NULL,
    EMAIL VARCHAR(50) NOT NULL,
    PASSWORD VARCHAR(100) NOT NULL
)

CREATE TABLE tasks(
    ID SERIAL PRIMARY KEY,
    TAREFA VARCHAR(50) NOT NULL,
    DESCRICAO VARCAHR(200) NOT NULL,
    ID_USER INTEGER REFERENCE USERS(ID)
    STATUS VARCHAR(10) NOT NULL,
)
```

## 🚀 Rodando o backend

```bash
node private/server
```

## 📦 Estrutura do projeto

```bash
backend/

├─ src/
├─ ├─ private/
    │  ├─ tasklist/       # API de tarefas
    │  │ ├─ task.controller.js         # Lógica das rotas da tarefa
    │  │ ├─ task.model.js              # Modelo de tarefa para o banco de dados
    ├  │ ├─ task.service.js            # Regra de negócio da tarefa
    ├  │ └─ task.routes.js             # Rotas da tarefa
    ├  ├─ users/                        # API de usuários
    ├  │ ├─ user.controller.js         # Lógica das rotas do usuário
    ├  │ ├─ user.model.js              # Modelo de usuário para o banco de dados
    ├  │ ├─ user.service.js            # Regra de negócio do usuário
    ├  │ └─ user.routes.js             # Rotas do usuário
    └─ server.js
├─ .env
├─ package.json
└─ README.md
```

## 🔐 Autentificação

** Usuário recebe JWT ao fazer login
** Todos as rotas que exigem autentificação usam o middleware ```authMiddleware```

## ⚙️ Boas praticas

** Sempre validar dados no **Service** antes de enviar ao banco.
** Evitar duplicidade de tarefas com status ativo.
** Permitir atualização parcial de tarefas (nome, descrição ou status).
** JWT deve ser verificado para rotas privadas.

## 📌 Próximo passo

** Conectar com o frontend React (Vite) em outro repositório.
** Adicionar testes unitários e integração.
** Implementar filtros e paginação de tarefas.

## Licença

Este projeto é licenciado sob a Licença MIT – consulte o arquivo ```LICENSE``` para mais detalhes.