import { Pool } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

class DatabaseConnect {
    
    constructor(){
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            idleTimeoutMillis: 10000
        });
    }

    async query(text, params){
        return this.pool.query(text, params);
        
    }

    async disconnect() {
        await this.pool.end();
        console.log('Database connection closed.');
        
    }
}

export default DatabaseConnect;