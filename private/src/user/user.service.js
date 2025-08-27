import UserModal from "./user.model.js";
import bcrypt from 'bcrypt';

class UserService{
    constructor() {
        this.UserModal = new UserModal();
    };

    async createUser(body){
        const users = await this.UserModal.getUser({ email: body.email });
        
        if(users.email === body.email){
            throw new Error("Usuario ja existe")
        }

        const hashSenha = await bcrypt.hash(body.password, 10)
        body.password = hashSenha

       const response = await this.UserModal.createUser(body);
       
       return { id: response.rows[0].id, username:response.raws[0].username }
    };

    async getUser(body){
        const users = await this.UserModal.getUser({ email: body.email });
        
        if(!users) {
            throw new Error("Usuário não encontrado");
        }
        
        const hashSenha = await bcrypt.compare(body.password, users.rows[0].passwords);

        if(!hashSenha){
            throw new Error("Senha inválida");
        }
        
        return { id: users.rows[0].id, username: users.rows[0].username };
    };

    async updateUser(body){
        const user = await this.UserModal.getUser({ id: body.id });

        if(!user){
            throw new Error("Usuário não existe");
        }

        if(body.password){
            const hashPassword = await bcrypt.hash(body.password, 10);

            body.password = hashPassword;
        }

        await this.UserModal.updateUser(body);
        return { msg: "Usuario alterado com sucesso" }
    };

    async deleteUser(id){
        const user = await this.UserModal.getUser({ id });

        if(!user){
            throw new Error("Usuário não existe");
        };

        await this.UserModal.deleteUser({ id });
        return { msg:"ok"}
    };
};

export default UserService;