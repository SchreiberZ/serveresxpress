import express from "express"
const app = express()

app.get('/', (req, res) => {
    res.send("Você está na pagina principal")
})

app.post('/', (req, res) => {
    res.send("Você está na pagina principal")
})

app.listen(3333, () => {
    console.log("servidor rodando na porta 3333")
})