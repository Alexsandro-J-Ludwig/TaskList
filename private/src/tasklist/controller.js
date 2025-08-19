import TaskService from "./service.js";

class TaskController {
    constructor(){
        this.TaskService = new TaskService();
    }

    async createTask(req, res){
        try {
            const { tarefa, descricao, id_user} = req.body;
            
            if(!tarefa){
                return res.status(400).send({ msg: "O nome da tarefa deve ser preenchido" });
            }

            await this.TaskService.createTask(req.body);

            return res.status(201).send({ msg: "Tarefa criada!" });

        } catch(error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async getTask(req, res){
        try {
            const { id_user } = req.body;

            const tasks = await this.TaskService.getTasks(req.body);
            return res.status(200).send(tasks);

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