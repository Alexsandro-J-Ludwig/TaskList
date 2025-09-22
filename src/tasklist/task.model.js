import DatabaseConnect from '../config/config.db.js';

class TaskModal {
    constructor() {
        this.pool = new DatabaseConnect();
    }

    //Cria tarefas para um usuário
    async createTask({titulo, descricao, id_user, status="incompleto"}) {
        const query = `
        INSERT INTO todolist(titulo, descricao, id_user, status)
        VALUES ($1, $2, $3, $4);
        `

        await this.pool.query(query, [titulo, descricao, id_user, status]);
    };

    async getTasks({ id }){
        const query = `
            SELECT * FROM todolist WHERE id=$1
        `

        await this.pool.query(query, [id]);
    }

    //Atualiza as tarefas de acordo com os campos que são desejados informar
    async updateTask({id, titulo, descricao, status, id_user}) {
        const value = [];
        const field = [];
        let index = 0;

        if(titulo != null){
            value.push(titulo);
            field.push(`titulo=$${++index}`);
        }
        if(descricao != null){
            value.push(descricao);
            field.push(`descricao=$${++index}`);
        }
        if(status != null){
            value.push(status);
            field.push(`status=$${++index}`);
        }

        const query = `
            UPDATE todolist SET ${field.join(', ')} WHERE id=$${++index} AND id_user=$${++index}
        `;
        
        value.push(id);
        value.push(id_user);

        await this.pool.query(query, value);
    }

    async deleteTask({ id, id_user }) {
        const query = `
            DELETE FROM todolist WHERE id=$1 AND id_user=$2
        `

        await this.pool.query(query, [id, id_user]);
    }
}

export default TaskModal;
