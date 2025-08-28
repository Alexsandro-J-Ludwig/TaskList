import TaskModal from './task.model.js';

class TaskService {
    constructor(){
        this.taskModal = new TaskModal();
    }

    async createTask(body) {
        const taskVerify = await this.getTasks({ id_user: body.id_user });

        const exists = taskVerify.rows.some(t => t.tarefa === body.tarefa && t.status === "incompleto");
        
        if (exists) {
            throw new Error("Essa tarefa já existe com status incompleto");
        }
        
        await this.taskModal.createTask(body);
        return { msg: "ok" };
    }

    async getTasks(body) {
        const tasks = await this.taskModal.getTasks(body);
        return tasks;
    }

    async updateTask(body) {
        const result = await this.getTasks({ id: body.id });

        if(!result.rows || result.rows.length === 0){
            throw new Error("Tarefa não encontrada");
        }

        if ("tarefa" in body && (body.tarefa === null || body.tarefa.trim() === "")) {
            throw new Error("O nome da tarefa não pode ser vazio");
        }

        await this.taskModal.updateTask(body);
    }

    async deleteTask(body) {
        const result = await this.getTasks({ id: body.id });
        
        if(!result.rows || result.rows.length === 0){
            throw new Error("Tarefa não encontrada");
        }

        await this.taskModal.deleteTask(body);
        return { msg: "ok" };
    }
}

export default TaskService;