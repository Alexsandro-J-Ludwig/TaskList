import UserService from "./user.service.js"
import jwt from 'jsonwebtoken';
import ValidateCredentials from "./user.validator.js";

class UserController{
    constructor() {
        this.UserService = new UserService();
        this.ValidateCredentials = new ValidateCredentials();
    };

    async createUser(req, res){
        try{
            const { username, email, password } = req.body;
            
            const validations = [
                this.ValidateCredentials.validateFields(["username", "email", "password"], req.body), 
                this.ValidateCredentials.validateEmail(req.body.email),
                this.ValidateCredentials.validatePassword(req.body.password)
            ]

            const failed = validations.find(v => v && v.valid === false);

            if (failed) {
                return res.status(400).json({ msg: failed.msg });
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
            
            const validations = [
                this.ValidateCredentials.validateFields(['email', "password"], req.body), 
                this.ValidateCredentials.validateEmail(req.body.email),
                this.ValidateCredentials.validatePassword(req.body.password)
            ]

            const failed = validations.find(v => v && v.valid === false)

            if(failed){
                return res.status(400).send({ msg: failed.msg })
            }

            const response = await this.UserService.getUser(req.body);

            if(!response){
                return res.status(400).json({ msg:"Usuário ou senha incorretos" });
            }

            const token = jwt.sign({ id:response.id, username:response.username }, process.env.SJWT, {expiresIn:86400});

            return res.status(200).json({ token });

        } catch(error){
            return res.status(500).send({ msg:`erro no servidor: ${error}` });
        }
    }

    async updateUser(req, res){
        try{    
            const id = req.user.id;

            const { username, email, password, active } = req.body;
            
            if(password){
                const validations = this.ValidateCredentials.validatePassword(req.body.password);

                if(!validations.valid) res.status(400).send({ msg:validations.msg })
            }

            const response = await this.UserService.updateUser({
                id: id,
                ...req.body
            });

            if(!response){
                return res.status(501).send({ msg:"Não foi possível realizar a atualização de usuário" });
            };

            return res.status(200).send({ msg:"usuário atualizado com sucesso" });
        } catch(error){
            return res.status(500).send({ msg:`erro no servidor: ${error}` });
        };
    };

    async deleteUser(req, res){
        try {            
            const id = req.user.id;

            const response = await this.UserService.deleteUser(id);

            if(!response){
                return res.status(404).send({ msg:"Usuário não encontrado" });
            };

            return res.status(200).send({ msg:"Usuario deletado" });

        } catch (error) {
            return res.status(500).send({ msg:`Erro no servidor: ${error}` });
        };
    };
};

export default UserController;