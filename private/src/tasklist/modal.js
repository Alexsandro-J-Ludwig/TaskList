import DatabaseConnect from '../config/config.db.js';

class TaskModal {
    constructor() {
        this.pool = DatabaseConnect.pool;
    }

    async createTask({tarefa, descricao, id_user, status=false}) {
        const query = `
        INSERT INTO todolist(tarefa, descricao, id_user, status)
        VALUES ($1, $2, $3, $4);
        `
        await this.pool.query(query, [tarefa, descricao, status]);
    };

    async getTasks({ id_user }) {
        const result = await client.query('SELECT * FROM todolist WHERE id=$1');
        return result.rows;
    };

    async updateTaskStatus({tarefa, descricao, status, id}) {
        const values = [];
        const field = [];
        let index = 1;

        if(tarefa !== undefined){
            field.push(`tarefa=$${index++}`);
            values.push(tarefa);
        } if(descricao !== undefined){
            field.push(`descricao=$${index++}`);
            values.push(descricao);
        } if(status !== undefined){
            field.push(`status=$${index++}`);
            values.push(status)
        }

        if(field.length==0) return;

        const query = `UPDATE todolist SET ${field.join(', ')} WHERE id=${index}`
        values.push(id);

        await this.pool.query(query, values);
    }

    async deleteTask({ id }) {
        const query = `
        DELETE FROM todolist WHERE ID=$1`
        await this.pool.query(query, [id]);
    }
}

export default TaskModal;