import dotenv from 'dotenv'
dotenv.config();

import TaskRoutes from './tasklist/task.routes.js';
import UserRoutes from './user/user.route.js';

import cors from 'cors';

import express from 'express';

const app = express();

app.use(express.json())
app.use(cors());

const taskRoutes = new TaskRoutes();
app.use('/tasks', taskRoutes.routes);

const userRotues = new UserRoutes();
app.use('/user', userRotues.routes)

app.listen(process.env.PORT || 3000, () => {console.log('Servidor rodando na porta 3000');
})  