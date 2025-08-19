//Tarefas realizadas para o funcionamento do back-end
async function addTarefa(tarefa, descricao) {
    const id_user = 1
    const data = {
        tarefa: tarefa,
        descricao: descricao ?? "",
        id_user: id_user
    }

    try {
        const response = await fetch('http://localhost:3000/tasks/createTask', {
            method: `POST`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if(!response){
            throw new Error(`Erro de requisição: ${response.status}`);
        }

        console.log(`Tarefa criada com sucesso`, await response.json());
        
    } catch (error) {
        console.error("Erro ao criar tarefa: ", error);
    }
    
    
};

async function carregar() {
    const id_user = 1;

    const data = {
        id_user: id_user
    }

    try {
        const response = await fetch(`http://localhost:3000/tasks/getTask:${id_user}`, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
        })

        if(!response){
            throw new Error(`Erro ao requisitar dados: ${await response.status}`);
        }

        const ul = document.getElementById('lista');
        const data = await response.json();
        ul.innerHTML = data
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
        
    } catch (error) {
        console.error(`Erro ao requisitar dados: `, error);
    }
};

async function concluir(id, status) { //Inverte o status usando como parametro o ID e o Status
    console.log('passou')
    await fetch(`http://localhost:3000/tasks/updateTask`, { 
        method: 'PUT', 
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: !status })
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
    const descricao = document.getElementById('descricao').value;

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

carregar()

//Para pagina de login

