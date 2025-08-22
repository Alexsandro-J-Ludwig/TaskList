import UserModal from "./user.model.js";
import bcrypt from 'bcrypt';

class UserService{
    constructor() {
        this.UserModal = new UserModal();
    };

    async createUser(body){
        const users = await this.UserModal.getUser(body.email);

        if(users.email == body.email){
            throw new Error("Usuario ja existe")
        }

        const hashSenha = await bcrypt.hash(body.password, 10)
        body.password = hashSenha;

        await this.UserModal.createUser(body);
    };

    async getUser(body){
        const user = await this.UserModal.getUser({username: body.username});

        if(!user.rows) {
            throw new Error("Usuário não encontrado");
        }

        const hashSenha = await bcrypt.compare(body.password, user.password);

        if(!hashSenha){
            throw new Error("Senha inválida");
        }

        return { id: user.id, username: user.username}; 
    };

    async updateUser(body){
        const user = await this.UserModal.getUser({ id: body.id });

        if(!user){
            throw new Error("Usuário não existe");
        }

        if(body.password){
            const hashPassword = await bcrypt.hash(body.password)

            body.password = hashPassword;
        }

        await this.UserModal.updateUser(body);
    };

    async deleteUser(body){
        const user = await this.UserModal.getUser({ id: body.id })

        if(!user){
            throw new Error("Usuário não existe")
        }

        await this.UserModal.deleteUser(user.id);
    };
};

export default UserService;