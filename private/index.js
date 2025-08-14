import TaskRoutes from './src/tasklist/routes.js';

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import express from 'express';

const app = express();

app.use(express.json())
app.use(cors());

const taskRoutes = new TaskRoutes();
app.use('/tasks', taskRoutes.routes);

app.listen(3000, () => {console.log('Servidor rodando na porta 3000');
})