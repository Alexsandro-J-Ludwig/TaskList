//Tarefas realizadas para o funcionamento do back-end
async function addTarefa(tarefa) {
    await fetch('http://localhost:3000/tasks', {
        method: `POST`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tarefa })
    });
};

async function carregar() {
    const response = await; fetch('http://localhost:3000/tasks');
    if(!response.ok) {
        console.error("Erro ao carregar tarefas");
        return;
    }

    const todolist = await response.json();

    const ul = document.getElementById('lista');
    ul.innerHTML = todolist
        .map(t => `
            <div class="tarefas" data-id="${t.id}">
                <input type='button' class='tarefa' 
                onclick="concluir(${t.id}, ${t.status})" 
                value='${t.tarefa}') 
                style="${t.status ? 'text-decoration: line-through; opacity: 0.7; color: rgb(128, 128, 128)' : ''}">
                <button class='delete' onclick="deletar(${t.id})">
                    x
                </button>
            </div>
            `
        ).join('');
};

async function concluir(id, status) { //Inverte o status usando como parametro o ID e o Status
    console.log('passou');
    await fetch(`http://localhost:3000/tasks/${id}`, { 
        method: 'PUT', 
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: !status });
    });
    carregar();
}

async function deletar(id) {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' });
    carregar();
}


//Tarefas realizadas para o front-end
function submit() {
    const tarefa = document.getElementById('tarefa').value;

    if (tarefa === '') {
        return console.error('O campo deve conter algo');
    };

    addTarefa(tarefa).then(() => { //Realiza o chamado das funcoes quando a funcao de adicionar tarefa e realziada
        carregar();
        limparCampos();
    })
}

function limparCampos () {
    document.getElementById('tarefa').value = ''
}

carregar();