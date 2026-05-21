# Sorteador de nomes 

Aplicação web simples para cadastro e sorteio aleatório de participantes 

Esse projeto foi desenvolvido como desafio técnico para vaga de estágio do BB

![preview](./assets/previewProjeto.png)

---

## Técnologias utilizadas :

**Frontend**

* HTML5
* CSS3
* JavaScript

**Backend**

* Node.js + express
* TypeScript

---

## ✨ Funcionalidades

- Adicionar participantes
- Remover participantes
- Listar participantes
- Sortear participante aleatoriamente
- Validação de nomes duplicados
- Armazenamento em memória

---

# 📂 Estrutura do projeto

```bash
sorteador/
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   └── routes.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── index.html
    ├── styles.css
    └── scripts.js
```

---

 📌 Rotas da API

## Adicionar participante

```http
POST /participantes
```

Body:

```json
{
  "nome": "Gabriel"
}
```

---

## Listar participantes

```http
GET /participantes
```

---

## Remover participante

```http
DELETE /participantes
```

Body:

```json
{
  "nome": "Gabriel"
}
```

---

## Sortear participante

```http
POST /sorteado
```

---

## Deploy

Deploy feito diretamente pelo github, via github pages, confira abaixo 

Link: 