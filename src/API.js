const { completarTarefa, criarTarefa, deletarTarefa, listarTarefas, incompletarTarefa } = require("./db.js")
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('public'))
require('dotenv').config();

app.post(`/Todolist`, async(req, res) => {
    try{
        const { tarefa, descricao } = req.body
        await criarTarefa(tarefa, descricao);
        res.status(201).json({ ok: true});
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Falha ao criar tarefa'})
    }

});

app.get(`/Todolist`, async(_req, res) => {
    try{
        const todolist = await listarTarefas();
        res.json(todolist); 
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: `Falha ao carregar tarefas`})
    }

});

app.put(`/Todolist/:id`, async(req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;
        await completarTarefa(status, Number(id));
        res.json({ ok: true});  
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Falha em alterar o status da tarefa"})
    }

})

app.delete(`/Todolist/:id`, async(req, res) => {
    try {
        await deletarTarefa(Number(req.params.id));
        res.json({ ok: true })        
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Falha em deletar tarefa"})
    }

})

app.listen(3000, () => console.log(`API http://localhost:3000`));