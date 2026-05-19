const URL = "http://localhost:3032"

mostrarNomes();

async function adicionarNome() {
    const nomeInput = document.querySelector("#nomeInput")
    const nome = nomeInput.value

    if(!nome){
        alert("Digite um nome")
        return
    }

    await fetch(`${URL}/participantes`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({nome})
    })

    nomeInput = ''
    mostrarNomes();
}

async function mostrarNomes() {
    const resposta = await fetch(`${URL}/participantes`)

    const nomes = await resposta.json()

    const listaNomes = document.querySelector("#lista")
    listaNomes.innerHTML = ''

    nomes.forEach((nome) => {
        const elemento = document.createElement('li')
        elemento.textContent = ''
        listaNomes.appendChild(elemento)
        elemento.textContent = nome
    })
}
