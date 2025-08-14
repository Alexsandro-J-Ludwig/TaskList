import TaskModal from './modal.js';

class TaskService {
    constructor(){
        this.taskModal = new TaskModal();
    }

    async createTask(body, status=false) {
        await this.taskModal.createTask(body, status);
    }

    async getTasks(body) {
        const tasks = await this.taskModal.getTasks(body);
        return tasks;
    }

    async updateTaskStatus(body) {
        await this.taskModal.updateTaskStatus(body);
    }

    async deleteTask(body) {
        await this.taskModal.deleteTask(body);
    }
}

export default TaskService;