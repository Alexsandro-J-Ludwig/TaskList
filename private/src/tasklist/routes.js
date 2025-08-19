import TaskController from './controller.js';
import { Router } from 'express';

class TaskRoutes{
    constructor(){
        this.routes = Router();
        this.TaskController = new TaskController();

        this.initRoutes();
    }

    initRoutes(){
        this.routes.post('/createTask', this.TaskController.createTask.bind(this.TaskController));
        this.routes.get('/getTask:id_user', this.TaskController.getTask.bind(this.TaskController));
        this.routes.put('/updateTask', this.TaskController.updateTask.bind(this.TaskController));
        this.routes.delete('/deleteTask', this.TaskController.deleteTask.bind(this.TaskController));
    }
}

export default TaskRoutes;