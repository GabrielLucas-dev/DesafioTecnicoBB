import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let participantes: string[] = [];

app.post('/participantes', (req: Request, res: Response) => {
    const {nome} = req.body
    if(!nome) return res.status(400).json({message: "O nome é obrigatorio"})
    if(participantes.includes(nome)) return res.status(400).json({message: "Nome já cadastrado, coloque também o sobrenome"})

    participantes.push(nome)
    return res.status(201).json(`${nome} adicionado`)
})

app.get("/participantes", (req: Request, res: Response) => {
    return res.status(200).json(participantes);
})

app.delete("/participantes", (req: Request, res: Response) => {
    const {nome} = req.body
    if(!nome) return res.status(404).json({message: "Nome faltando"})

    const indexNomeRemovido = participantes.indexOf(nome)

    if(indexNomeRemovido === -1) return res.status(404).send({message: `${nome} não esta participando do sorteio`})

    participantes.splice(indexNomeRemovido, 1)
    return res.status(200).send({message: `"${nome}" removido(a)`})
})

function gerarNome(): string {
    if(participantes.length === 0) throw new Error("Não há usuarios na lista, insira ao menos 1 para sortear");
    
    let randomNome: number = Math.floor(Math.random() * participantes.length);
    const ganhador = participantes[randomNome];
    return ganhador!;
}

app.post('/sorteado', (req, res) => {
    try{
        const sorteado: string = gerarNome();
        res.status(201).json(sorteado);
    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
})

const PORT: number = 3032;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))