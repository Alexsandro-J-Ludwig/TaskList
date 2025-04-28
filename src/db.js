import { Client } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

client.connect()
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err))

export async function criarTarefa(tarefa, descricao, status=`false`){
    const query = `
    INSERT INTO todolist(tarefa, descricao, status)
    VALUES ($1, $2, $3);
    `;
    await client.query(query, [tarefa, descricao, status])
}

export async function listarTarefas() {
    const result = await client.query('SELECT * FROM todolist');
    return result.rows;
}

export async function completarTarefa(status, id) {
    const query = `
    UPDATE todolist
    SET STATUS = $1
    WHERE ID=$2
    `
    await client.query(query, [status, id]) 
}

export async function deletarTarefa(id) {
    const query = `
    DELETE FROM todolist WHERE ID=$1`
    await client.query(query, [id])
}

export { client };