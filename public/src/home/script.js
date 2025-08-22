//Tarefas realizadas para o funcionamento do back-end
async function addTarefa(tarefa, descricao) {
    const id_user = 1;
    const data = {
        tarefa: tarefa,
        descricao: descricao,
        id_user: id_user
    };

    try {
        const response = await fetch('http://localhost:3000/tasks/createTask', {
            method: `POST`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        validarResponse(response);

        console.log(`Tarefa criada com sucesso`, await response.json());
        
    } catch (error) {
        console.error("Erro ao criar tarefa: ", error);
    }
    
    
};

async function carregar() {
    const id_user = 1;

    try {
        const response = await fetch(`http://localhost:3000/tasks/getTask?id_user=${id_user}`, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
        })  

        validarResponse(response);

        const ul = document.getElementById('lista');
        const data = await response.json();
        ul.innerHTML = data
        .map(t => `
            <div class="tarefas" data-id="${t.id}">
                <input type='button' class='tarefa' 
                onclick="concluir( id:${t.id}, status:${(t.status)})" 
                value='${t.tarefa}')
                style="${t.status ? 'text-decoration: line-through; opacity: 0.7; color: rgb(128, 128, 128)' : ''}">
                <button class='delete' onclick="deletar(${t.id})">
                    x
                </button>
                <p>${t.descricao}</p>
            </div>
            `
        ).join('');
        
    } catch (error) {
        console.error(`Erro ao requisitar dados: `, error);
    };
};

const concluir = async(id, status) => {
    const data = {
        id: id,
        status: !status
    }

    atualizar(data);
}

async function atualizar(data) { //Inverte o status usando como parametro o ID e o Status
    try{
        const response = await fetch(`http://localhost:3000/tasks/updateTask`, {
            method: "PUT",
            headers: { 'Content-Type':'application/json' },
            body: JSON.stringify(data)
        });

        validarResponse(response);

    } catch(error){
        console.error(`Erro ao atualizar tarefa: `, error);
    };
};

async function deletar(id) {
    try {
        const response = await fetch('http://localhost:3000/tasks/deleteTask', {
            method: 'DELETE',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ id })
        })

        validarResponse(response);

        carregar();

    } catch (error) {
        console.error("Erro ao deletar tarefa: ", error)
    }

}


//Tarefas realizadas para o front-end
function submit() {
    const tarefa = document.getElementById('tarefa').value;
    const descricao = document.getElementById('descricao').value;

    if (tarefa === '') {
        return console.error('O campo deve conter algo');
    };

    addTarefa(tarefa, descricao).then(() => { //Realiza o chamado das funcoes quando a funcao de adicionar tarefa e realziada
        carregar();
        limparCampos();
    })
}

function limparCampos () {
    document.getElementById('tarefa').value = ''
}

function validarResponse(response){
    if(!response){
        throw new Error(`Erro de requisição: ${response.status}`)
    };
};

carregar()

//Para pagina de login

