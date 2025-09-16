import TaskController from './task.controller.js';
import { Router } from 'express';
import Middleware from "../middleware/auth.middleware.js"

class TaskRoutes{
    constructor(){
        this.routes = Router();
        this.TaskController = new TaskController();
        this.Middleware = new Middleware();

        this.initRoutes();
    }

    initRoutes(){
        this.routes.post('/createTask', 
            this.Middleware.valityToken.bind(this.Middleware),
            this.TaskController.createTask.bind(this.TaskController)
        );
        this.routes.get('/getTask', 
            this.Middleware.valityToken.bind(this.Middleware),
            this.TaskController.getTask.bind(this.TaskController)
        );
        this.routes.put('/updateTask', 
            this.Middleware.valityToken.bind(this.Middleware),
            this.TaskController.updateTask.bind(this.TaskController)
        );
        this.routes.delete('/deleteTask', 
            this.Middleware.valityToken.bind(this.Middleware),
            this.TaskController.deleteTask.bind(this.TaskController)
        );
    }
}

export default TaskRoutes;