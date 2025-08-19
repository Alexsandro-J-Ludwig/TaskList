JSON.parse(localStorage.setItem("id_user", 1));
const id_user = localStorage.getItem('id_user');
console.log(id_user);


async function login() {
    const username = document.getElementById('username_input');
    const password = document.getElementById('password_input');

    const response = await fetch('apiloginsystem-production.up.railway.app/login', {
        method: "POST",
        headers: { 'content-Type ': 'application/json'},
        body: JSON.stringify(username, password)
    });

    return response;
}

async function signup () {
    const username = document.getElementById('username_input_signup');
    const password = document.getElementById('password_input_signup');

    const response = await fetch('apiloginsystem-production.up.railway.app/signup', {
        method: "PSOT",
        headers: { 'contend-Type ': 'application/json'},
        body: JSON.stringify(username, password)
    });
}