import UserController from "./user.controller.js";
import { Router } from 'express';

class UserRoutes{
    constructor() {
        this.routes = Router();
        this.UserController = new UserController();

        this.initRoutes();
    };

    async initRoutes(){
        this.routes.post('/signup', this.UserController.createUser.bind(this.UserController));
        this.routes.get("/login", this.UserController.getUser.bind(this.UserController));
        this.routes.put("/update", this.UserController.getUser.bind(this.UserController));
        this.routes.delete("/delete", this.UserController.deleteUser.bind(this.UserController));
    };
};

export default UserRoutes;