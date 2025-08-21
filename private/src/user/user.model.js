import DatabaseConnect from "../config/config.db";

class UserModal{
    constructor() {
        this.pool = new DatabaseConnect();
    };

    async createUser(username, email, password){
        const query = `
            INSERT INTO user(username, email, password)
            VALUES($1, $2, $3, $4)
        `;
        await this.pool.query(query, [username, email, password]);
    };

    async getUser(username, password){
        const query = `
            SELECT * FROM user WHERE = $1
        `;

        const response = await this.pool.query(query, [username, password]);

        if(response.rows < 1){
            return;
        };

        return response;
    };

    async updateUser(id, username, email, password){
        const value=[];
        const field=[];
        let index = 1;

        if(username != null){
            value.push(username);
            field.push(`username=$${index++}`);
        };
        if(email != null){
            value.push(email);
            field.push(`email=$${index++}`);
        };
        if(password != null){
            value.push(password);
            field.push(`password=$${index++}`);
        };

        const query = `
            UPDATE user SET ${field.join(', ')} WHERE id=$${index}
        `;
        value.push(id);
        await this.pool.query(query, value);
    };

    async deleteUser(id){
        const query = `
            DELETE FROM todolist WHERE=$1
        `;

        await this.pool.query(query, [id]);
    };
};

export default UserModal;