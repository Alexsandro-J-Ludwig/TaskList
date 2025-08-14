import { Pool } from 'pg';

class DatabaseConnect {
    
    constructor(){
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        })
        .than(console.log("Conectado ao banco de dados"))
        .than(console.log('Não foi possível conectar no banco de dados'))
    }

    async disconnect() {
        await this.pool.end();
        console.log('Database connection closed.');
        
    }
}

export default DatabaseConnect;