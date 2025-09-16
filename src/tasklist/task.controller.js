import TaskService from "./task.service.js";

class TaskController {
    constructor(){
        this.TaskService = new TaskService();
    }

    async createTask(req, res){
        const id_user = req.user.id

        try {
            const {titulo, descricao} = req.body;
            
            if(!titulo){
                return res.status(400).send({ msg: "O nome da tarefa deve ser preenchido" });
            }

            const data = {
                ...req.body,
                id_user
            }

            const response = await this.TaskService.createTask(data);

            if(!response){
                return res.status(400).send({ msg: "Erro ao criar tarefa" })
            }

            return res.status(201).send({ msg: "Tarefa criada!" });

        } catch(error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    //Pega as tarefas do usuário logado
    async getTask(req, res){
        const id_user = req.user.id;

        try {
            const tasks = await this.TaskService.getTasks({ id_user:id_user});
            return res.json(tasks.rows);

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async updateTask(req, res){
        const id_user = req.user.id;

        try {
            const { id, titulo, descricao, status } = req.body;

            const data = {
                ...req.body,
                id_user
            }

            await this.TaskService.updateTask(data);

            return res.status(200).send({msg:"Sucesso"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    async deleteTask(req, res){
        const id_user = req.user.id;

        try{
            const {id} = req.body

            const data = {
                id,
                id_user
            }

            const response = await this.TaskService.deleteTask(data);
            
            if(!response){
                return res.status(400).send({ msg: "Erro ao deletar tarefa" })
            }
            
            return res.status(200).send({msg:"Sucesso"});
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default TaskController;