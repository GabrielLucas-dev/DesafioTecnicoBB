import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let participantes: string[] = [];

app.post('/participantes', (req, res) => {
    const {nome} = req.body
    if(!nome) return res.status(400).json({message: "O nome é obrigatorio"})
    if(participantes.includes(nome)) return res.status(400).json({message: "Nome já cadastrado, coloque também o sobrenome"})

    participantes.push(nome)
    return res.status(201).json(`${nome} adicionado`)
})

app.get("/participantes", (req, res) => {
    return res.status(200).json(participantes);
})

let randomNome: number = Math.floor(Math.random() * participantes.length);

function gerarNome(): string {
    if(participantes.length === 0) throw new Error("Não há usuarios na lista, insira ao menos 1 para sortear");

    const ganhador = participantes[randomNome];
    return ganhador!;
}

const PORT: number = 3032;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))