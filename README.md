# Lista de Tarefas

Um sistema com funções básicas de listar tarefas, completá-las e apagá-las utilizando CRUD e uma API REST própria.

## Funcionalidades
- **Adicionar tarefa:** Adiciona a tarefa informada e grava no banco de dados.
- **Listar tarefas:** Lista as tarefas adicionadas ao banco de dados pelo usuário.
- **Completar tarefa:** Atualiza a tarefa no banco de dados entre falso e verdadeiro.
- **Apagar tarefas:** Apaga as tarefas no banco de dados pelo usuário.

## Tecnologias Utilizadas
- **HTML:** Estrutura da página.
- **CSS:** Estilo da página.
- **JavaScript:** Lógica do funcionamento e comunicação entre front-end e back-end.
- **Node.js:** Manipulação de dados e integração com o banco de dados.
- **PostgreSQL:** Banco de dados utilizado nesse projeto.

## Como usar

1. Clone o repositório:

```bash
git clone https://github.com/Ale-ludw/Lista-de-tarefas.git
```

2. Crie seu banco de dados através da interface do PostgreSQL chamado Todolist, entre no Query Tool e informe o seguinte código
```sql
CREATE TABLE TODOLIST(
    ID SERIAL PRIMARY KEY,
    TAREFA VARCHAR(40) NOT NULL,
    STATUS BOOLEAN NOT NULL
)
```

3. Inicialize o sistema:
```bash
npm init -y
```

4. Instale as dependências:
- **Cors**
- **Client**
- **Express**
- **Pg**
- **dotenv**

Use o comando

```bash
npm install cors express pg dotenv
```

5. Crie um arquivo .env na raiz do projeto com as seguintes variáveis (ajuste conforme seu PostgreSQL):
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=Todolist
DB_PORT=5432
```

6. Acesse a pasta '/src' pelo terminal com o seguinte comando:
```bash
cd src
```

7. Insira o comando abaixo:
```bash
node API.js
```

# Contribuições
Sinta-se à vontade para fazer contribuições! Para isso, siga os passos abaixo:

1. Faça um fork deste repositório.
2. Crie uma nova branch com a sua feature (git checkout -b feature/MinhaFeature).
3. Faça o commit das suas alterações (git commit -am 'Adicionando nova funcionalidade').
4. Envie para o seu repositório (git push origin feature/MinhaFeature).
5. Abra um pull request explicando as suas alterações.

# Licença

Este projeto é licenciado sob a Licença MIT – consulte o arquivo [LICENSE](LICENSE.txt) para mais detalhes.