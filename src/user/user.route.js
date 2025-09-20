import UserController from "./user.controller.js";
import { Router } from 'express';
import Middleware from "../middleware/auth.middleware.js";

class UserRoutes{
    constructor() {
        this.routes = Router();
        this.UserController = new UserController();
        this.Middleware = new Middleware();

        this.initRoutes();
    };

    async initRoutes(){
        this.routes.post('/signup', this.UserController.createUser.bind(this.UserController));
        this.routes.post("/login", this.UserController.getUser.bind(this.UserController));
        this.routes.post("/getUserById", this.UserController.getUserByEmail.bind(this.UserController))
        this.routes.put("/update", 
            this.Middleware.valityToken.bind(this.Middleware),
            this.UserController.updateUser.bind(this.UserController)
        );
        this.routes.delete("/delete", 
            this.Middleware.valityToken.bind(this.Middleware),
            this.UserController.deleteUser.bind(this.UserController)
        );
    };
};

export default UserRoutes;