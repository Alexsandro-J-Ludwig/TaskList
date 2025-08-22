import jwt from 'jsonwebtoken';

import TaskController from "../tasklist/task.controller.js";
import UserController from "../user/user.controller.js";

class Middleware{
    constructor() {
        this.secreteKey = process.env.SKJWT;
        this.TaskController = new TaskController();
        this.UserController = new UserController();
    };

    async valityToken(req, res, next){
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if(!token){
            return res.status(401).send({ msg:"Token invalido" });
        };

        try {
            const decode =jwt.verify(token, this.secreteKey);

            req.user = decode;

            next();
        } catch (error) {
            return res.status(401).send({ msg:"Token Expirado" });
        };
    };
};

export default Middleware;