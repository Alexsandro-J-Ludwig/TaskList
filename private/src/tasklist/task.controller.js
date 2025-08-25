import TaskService from "./task.service.js";

class TaskController {
    constructor(){
        this.TaskService = new TaskService();
    }

    async createTask(req, res){
        const id_user = req.user.id

        try {
            const { tarefa, descricao} = req.body;
            
            if(!tarefa){
                return res.status(400).send({ msg: "O nome da tarefa deve ser preenchido" });
            }

            const data = {
                tarefa,
                descricao,
                id_user
            }

            await this.TaskService.createTask(data);

            return res.status(201).send({ msg: "Tarefa criada!" });

        } catch(error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    //Pega as tarefas do usuário logado
    async getTask(req, res){
        const id_user = req.user.id;

        try {
            const data = {
                id_user
            }

            const tasks = await this.TaskService.getTasks(data);
            return res.json(tasks);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateTask(req, res){
        try {
            const { id, tarefa, descricao, status } = req.body;

            await this.TaskService.updateTaskStatus(req.body);

            return res.status(200).send({msg:"Sucesso"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async deleteTask(req, res){
        try{
            const {id} = req.body

            await this.TaskService.deleteTask(req.body);
            
            return res.status(200).send({msg:"Sucesso"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default TaskController;