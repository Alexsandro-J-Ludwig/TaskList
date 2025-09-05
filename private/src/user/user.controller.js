import UserService from "./user.service.js"
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
            
            const regex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

            if(!regex.test(email)){ 
                return res.status(400).json({ msg: "Email inválido" });
            }
            
            const response = await this.UserService.createUser(req.body);
        
            if(!response){
                return res.status(501).json({ msg: "Não foi possível completar o cadastro "});
            };

            const token = jwt.sign({ id:response.id, username:response.username }, process.env.SJWT, {expiresIn:86400})

            return res.status(200).json({ token })

        } catch(err){
            return res.status(500).send({ msg:"erro no servidor: " + err, })
        }
    }

    async getUser(req, res){
        try{
            const { email, password } = req.body;
            
            if(!email || !password){
                return res.status(501).json({ msg:"Nenhum campo pode estar vazio" });
            }

            const response = await this.UserService.getUser(req.body);

            if(!response){
                return res.status(400).json({ msg:"Usuário ou senha incorretos" });
            }
            console.log(response);
            
            const token = jwt.sign({ id:response.id, username:response.username }, process.env.SJWT, {expiresIn:86400});

            return res.status(200).json({ token });

        } catch(error){
            return res.status(500).send({ msg:"erro no servidor" });
        }
    }

    async updateUser(req, res){
        try{    
            const id = req.user.id;

            const { username, email, password, active } = req.body;

            const response = await this.UserService.updateUser({
                id: id,
                ...req.body
            });

            if(!response){
                return res.status(501).send({ msg:"Não foi possível realizar a atualização de usuário" });
            };

            return res.status(200).send({ msg:"usuário cadastrado com sucesso" });
        } catch(error){
            return res.status(500).send({ msg:"erro no servidor" });
        };
    };

    async deleteUser(req, res){
        try {
            const id = req.user.id;

            const response = await this.UserService.deleteUser({ id: id });

            if(!response){
                return res.status(404).send({ msg:"Usuário não encontrado" });
            };

            return res.status(200).send({ msg:"Usuario deletado" });

        } catch (error) {
            return res.status(500).send({ msg:"erro no servidor" });
        };
    };
};

export default UserController;