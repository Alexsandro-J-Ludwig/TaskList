import DatabaseConnect from "../config/config.db.js";

class UserModal{
    constructor() {
        this.pool = new DatabaseConnect();
    };

    async createUser({ username, email, password }){
        const query = `
            INSERT INTO users(username, email, passwords)
            VALUES($1, $2, $3)
            RETURNING id, username
        `;
        
        const result = await this.pool.query(query, [username, email, password]);
        return result;
    };

    async getUser({ id, email }){
        const query = `
            SELECT * FROM users WHERE id=$1 OR email=$2
        `;
            
        const result = await this.pool.query(query, [id, email]);
        return result;
    };

    async updateUser({ id, username, email, password, active }){
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
        if(active != false){
            value.push(active);
            field.push(`active=$${index++}`)
        }
        console.log(active);

        const query = `
            UPDATE users SET ${field.join(', ')} WHERE id=$${index}
        `;

        value.push(id);

        const result = await this.pool.query(query, value);
        return result;
    };

    async deleteUser({ id }){
        const query = `
            DELETE FROM users WHERE id=$1
        `;

        const result = await this.pool.query(query, [id]);
        return result;
    };
};

export default UserModal;