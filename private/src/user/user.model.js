import DatabaseConnect from "../config/config.db.js";

class UserModal{
    constructor() {
        this.pool = new DatabaseConnect();
    };

    async createUser({ username, email, password, randomCode }){
        const query = `
            INSERT INTO users(username, email, passwords, active, ranconCode, expirationDate)
            VALUES($1, $2, $3, false, $4, $5)
            RETURNING id, username
        `;
        const result = await this.pool.query(query, [username, email, password, randomCode]);
        return result.rows[0];
    };

    async getUser({ email }){
        const query = `
            SELECT * FROM users WHERE email=$1
        `;

        const response = await this.pool.query(query, [username, email]);

        return response;
    };

    async updateUser({ id, username, email, password }){
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
            UPDATE users SET ${field.join(', ')} WHERE id=$${index}
        `;
        value.push(id);
        await this.pool.query(query, value);
    };

    async deleteUser({ id }){
        const query = `
            DELETE FROM users WHERE=$1
        `;

        await this.pool.query(query, [id]);
    };
};

export default UserModal;