import UserService from "./user.service";
import jwt from 'jsonwebtoken';

class UserController{
    constructor() {
        this.UserService = new UserService();
    };

    async createUser(req, res){
        try{
            const { username, email, password } = req.body;

            if(!username || !email || !password){
                return res.status(400).json({ msg: "Os campos não podem estar vazios" });
            };

            const response = await this.UserService.createUser(req.body);

            if(!response){
                return res.status(501).json({ msg: "Não foi possível completar o cadastro "});
            };

            const token = jwt.sign({ id:response.id, username:response.username }, process.env.SJWT, {expiresIn:86400})

            return res.status(200).json({ token })

        } catch(error){
            return res.status(500).send({ msg:error })
        }
    }

    async getUser(req, res){
        try{
            const { username, password } = req.body;

            if(!username || !password){
                return res.status(501).json({ msg:"Nenhum campo pode estar vazio" });
            }

            const response = await this.UserService.getUser(req.body);

            if(!response){
                return res.status(501).json({ msg:"Usuário ou senha incorretos" });
            }

            const token = jwt.sign({ id:response.id, username:response.username }, process.env.SJWT, {expiresIn:86400});

            return res.status(200).json({ token });

        } catch(error){
            return res.status(500).send({ msg:error });
        }
    }

    async updateUser(req, res){
        try{
            const { id, username, email, password } = req.body
        }
    }

}