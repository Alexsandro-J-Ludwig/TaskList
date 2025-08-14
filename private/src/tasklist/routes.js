import TaskController from './controller.js';
import { Router } from 'express';

class TaskRoutes{
    constructor(){
        this.routes = Router();
        this.TaskController = new TaskController();

        this.initRoutes();
    }

    initRoutes(){
        this.routes.post('/createTask', (req, res) => this.taskController.createTask(req, res));
        this.routes.get('/getTask/', (req, res) => this.taskController.getTask(req, res));
        this.routes.put('/updateTask/:id', (req, res) => this.taskController.updateTask(req, res));
        this.routes.delete('/deleteTask/:id', (req, res) => this.taskController.deleteTask(req, res));
    }
}

export default TaskRoutes;