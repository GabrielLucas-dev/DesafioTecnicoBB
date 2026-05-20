const URL = "http://localhost:3032";

async function mostrarNomes() {
  const resposta = await fetch(`${URL}/participantes`);

  const nomes = await resposta.json();

  const listaNomes = document.querySelector("#lista");
  listaNomes.innerHTML = "";

  nomes.forEach((nome) => {
    const elemento = document.createElement("li");

    const nomeTexto = document.createElement("span");
    nomeTexto.textContent = nome;
    const removerBtn = document.createElement("button");
    removerBtn.textContent = "Remover";

    removerBtn.addEventListener("click", () => {
      removerNome(nome);
    });

    elemento.appendChild(nomeTexto);
    elemento.appendChild(removerBtn);

    listaNomes.appendChild(elemento);
  });
}

async function adicionarNome() {
  const nomeInput = document.querySelector("#nomeInput");
  const nome = nomeInput.value;

  if (!nome) {
    alert("Digite um nome");
    return;
  }

  try{ 
    await fetch(`${URL}/participantes`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({nome}) }) 
} catch(error) {
     if(error.status === 400) {console.log('teste')} 
    }

    mostrarNomes();
}

async function removerNome(nome) {
  try {
    await fetch(`${URL}/participantes`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });
  } catch (error) {
    console.log(error);
  }

  await mostrarNomes();
}

async function sortear() {
  const resultado = await fetch(`${URL}/sorteado`, {
    method: "POST",
  });
  const nome = await resultado.json();

  const nomeGanhador = document.querySelector("#resultado");
  nomeGanhador.textContent = nome;
}

mostrarNomes();
