const URL = "http://localhost:3032";

async function mostrarNomes() {
  const resposta = await fetch(`${URL}/participantes`);

  const nomes = await resposta.json();

  const sortearBtn = document.querySelector("#sortear-btn");
  if (nomes.length === 0) {
    sortearBtn.classList.add("disabled");
  } else {
    sortearBtn.classList.remove("disabled");
  }

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
  const nome = nomeInput.value.trim().toUpperCase();

  if (!nome) {
    alert("Digite um nome");
    return;
  }

  const resposta = await fetch(`${URL}/participantes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome }),
  });

  if (!resposta.ok) {
    alert("Nome já está no sorteio");
    return;
  }

  nomeInput.value = "";
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

  mostrarNomes();
}

async function sortear() {
  const resultado = await fetch(`${URL}/sorteado`, {
    method: "POST",
  });
  const nome = await resultado.json();

  if (!resultado.ok) {
    alert("Deve haver pelo menos 2 pessoas para conseguir sortear!");
    return;
  }

  const nomeGanhador = document.querySelector("#resultado");
  nomeGanhador.textContent = nome;
}

mostrarNomes();

async function importarPlanilha() {
  const input = document.querySelector("#inputArquivo");
  const arquivo = input.files[0];

  if (!arquivo) {
    alert("Nenhum arquivo recebido");
    return;
  }

  const buffer = await arquivo.arrayBuffer()
  const workbook = XLSX.read(buffer, {type: "array"})

  const primeiraAba = workbook.Sheets[workbook.SheetNames[0]]

  const linhas = XLSX.utils.sheet_to_json(primeiraAba)

  const nomes = linhas.map(linha => linha["nomes"]?.toString().trim().toUpperCase()).filter(nome => nome && nome !== "")

  if(nomes.length === 0) {
    alert(`nenhum nome encotrado, verifique se a coluna se chama "nomes"`)
    return 
  }

  for (const nome of nomes) {
    const resposta = await fetch(`${URL}/participantes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      console.log(`${nome} não adicionado: ${erro.message}`);
    }
  }

  await mostrarNomes();
  input.value = "";
}
