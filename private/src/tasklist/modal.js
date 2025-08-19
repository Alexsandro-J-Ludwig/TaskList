import DatabaseConnect from '../config/config.db.js';

class TaskModal {
    constructor() {
        this.pool = new DatabaseConnect();
    }

    //Cria tarefas para um usuário
    async createTask({tarefa, descricao, id_user, status=false}) {
        const query = `
        INSERT INTO todolist(tarefa, descricao, id_user, status)
        VALUES ($1, $2, $3, $4);
        `

        await this.pool.query(query, [tarefa, descricao, id_user, status]);
    };

    //Pega todas as tarefas apra exibir ao usuário em sua página
    async getTasks({ id_user }) {
        const result = await this.pool.query(`SELECT * FROM todolist WHERE id_user=$1`, [id_user]);
        return result.rows;
    };

    //Atualiza as tarefas de acordo com os campos que são desejados informar
    async updateTaskStatus({id, tarefa, descricao, status}) {
        if(tarefa != null){
            await this.pool.query(`UPDATE todolist SET tarefa=$2 WHERE id=$1`, [id, tarefa]);
        }
        if(descricao != null){
            await this.pool.query(`UPDATE todolsit SET $2 WHERE id=$1`, [id, descricao])
        };
        if(status != null){
            await this.pool.query(`UPDATE todolist SET $2 WHERE id=$1`, [id, status])
        }
    }

    async deleteTask({ id }) {
        await this.pool.query(`DELETE FROM todolist WHERE id=$1`, [id])
    }
}

export default TaskModal;