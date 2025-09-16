import { Pool } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

class DatabaseConnect {
    
    constructor(){
        this.pool = new Pool({
            connectionString: process.env.URL_DB
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