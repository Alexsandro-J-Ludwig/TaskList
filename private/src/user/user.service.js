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

        const numbers = '1234567890';
        const randomCode = '';

        while(randomCode.length <= 6){
            const index = Math.floor(Math.random() * numbers.length);
            randomCode += numbers[index];
        }

        randomCode = await bcrypt.hash(randomCode, 10)

        const expirationTimeLeft = 15
        const expirationDate = new Date
        expirationDate.setMinutes(expirationDate.getMinutes() + expirationTimeLeft);

        const data = {
            username,
            email,
            password,
            randomCode: randomCode,
            expirationDate: expirationDate
        }

        await this.UserModal.createUser(data);

        this.sendEmail()
    };

    async getUser(body){
        const user = await this.UserModal.getUser({email: body.email});

        if(!user.rows) {
            throw new Error("Usuário não encontrado");
        }
        if(user.rows.active == false){
            throw new Error("Usuario inativo")
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
            const hashPassword = await bcrypt.hash(body.password);

            body.password = hashPassword;
        }

        await this.UserModal.updateUser(body);
    };

    async deleteUser(body){
        const user = await this.UserModal.getUser({ id: body.id });

        if(!user){
            throw new Error("Usuário não existe");
        };

        await this.UserModal.deleteUser(user.id);
    };

    async sendEmail(){
        
    }
};

export default UserService;