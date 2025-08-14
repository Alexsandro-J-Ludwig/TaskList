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

            await this.TaskService.createTask(body);

            return res.status(201).send({ msg: "Tarefa criada!" });

        } catch(err) {
            return res.status(500).send({ msg: err });
        }
    }

    async getTask(req, res){
        try {
            const { id_user } = req.body;

            await this.TaskService.getTasks(req.body);

            const tasks = await this.TaskService.getTasks(req.body);
            return res.status(200).send(tasks);

        } catch (err) {
            return res.status(500).send({ msg: err })
        }
    }

    async updateTask(req, res){
        try {
            const {tarefa, descricao, status, id} = req.body;

            await this.TaskService.updateTaskStatus(req.body);

            return res.status(200).send({msg:"Sucesso"});
        } catch (err) {
            return res.status(500).send({ msg: err })
        }
    }

    async deleteTask(req, res){
        try{
            const {id} = req.body

            await this.TaskService.deleteTask(req.body);
            
            return res.status(200).send({msg:"Sucesso"});
        } catch (err) {
            return res.status(500).send({ msg: err })
        }
    }
}

export default TaskController;