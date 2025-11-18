import express from "express"
import mongoose from "mongoose"
import {Pratos} from "./models/pratos.js"
import {Cliente} from "./models/cliente.js"
import { Pedido, Pedido } from "./models/pedido.js"
const app = express()
app.use(express.json())

app.get('/Pratos', async (req, res) => {
    const response = await Pratos.find()
    res.json(response)
})

app.get('/Cliente', async (req, res) => {
    const response = await Mesas.find()
    res.json(response)
})

app.get('/pedido', async (req, res) => {
    const response = await Pedido.find()
    res.json(response)
})

app.get('/Pratos/:id', async (req, res) => {
    const {id} = req.params
    const response = await Pratos.findById(id)
    res.json(response)
})

app.post('/Pratos', (req, res) => {
    const {nome, preco} = req.body
    if(!nome, !preco){
        res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
        return
    }
    const prato = new Pratos({
        nome, preco
    })
    prato.save().then(
        () => res.status(201).json({
            erro: false,
            message: "Prato criado com sucesso",
            prato: prato
        })).catch(
            () =>
            res.status(422).json({
            erro: true,
            message: "Dados inválidos"
            
        })
    )
})

app.post('/Cliente', (req, res) => {
    const {numero} = req.body
    if(!numero){
        res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
        return
    }
    const cliente = new Mesas({
        numero
    })
    cliente.save().then(
        () => res.status(201).json({
            erro: false,
            message: "Cliente criado com sucesso",
            cliente: cliente
        })).catch(
            () =>
            res.status(422).json({
            erro: true,
            message: "Dados inválidos"
            
        })
    )
})

app.post("/pedido", (req, res) => {
    const {numero, cliente, pratos} = req.body
    if(!numero, !cliente){
        return res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
    }
    const pedido = new Pedido({numero, cliente, pratos})
    pedido.save().then(
        () => res.status(201).json({
            erro: false,
            message: "Criado com sucesso"
        })
    ).catch(
        () =>
            res.status(422).json({
            erro: true,
            message: "Dados inválidos"
        })
    )
})  

app.put("/pedido/:id/pratos", async (req, res) => {
    const {id} = req.params
    const {pratos} = req.body
    const pedido = await Pedido.findByIdAndUpdate(id, {$addToSet: {pratos}})
    if (pedido){
        return res.json({
            erro: false,
            message: "prato adiconado"
        })
    }else{
            res.json({
                erro: true,
                message: "prato não foi adicionado"
            })
        }
})

app.put('/Pratos/:id', async (req, res) => {
    const {id} = req.params
    const {nome, preco} = req.body
    const response = await Pratos.findByIdAndUpdate(id, {preco})
    if(response){
        res.json({
            erro: false,
            message: "Alteração feita"
        })
    }else(
        res.json({
            erro: true,
            message: "Alteração não feita"
        })
    )
})

app.put('/Cliente/:id', async (req, res) => {
    const {id} = req.params
    const {numero} = req.body
    const response = await Cliente.findByIdAndUpdate(id, {numero})
    if(response){
        res.json({
            erro: false,
            message: "Alteração feita"
        })
    }else(
        res.json({
            erro: true,
            message: "Alteração não feita"
        })
    )
})

app.delete('/Pratos/:id', async (req, res) => {
    const {id} = req.params
    const response = await Pratos.findByIdAndDelete(id)
    if(response){
        res.json({
            erro: false,
            message: "Prato apagado"
        })
    }else(
        res.json({
            erro: true,
            message: "Apagamento não apagado"
        })
    )
})

app.delete('/Cliente/:id', async (req, res) => {
    const {id} = req.params
    const response = await Cliente.findByIdAndDelete(id)
    if(response){
        res.json({
            erro: false,
            message: "Cliente apagado"
        })
    }else(
        res.json({
            erro: true,
            message: "Cliente não apagada"
        })
    )
})

app.delete('/pedido/:id', async (req, res) => {
    const {id} = req.params
    const response = await Pedido.findByIdAndDelete(id)
    if(response){
        res.json({
            erro: false,
            message: "Pedido apagado"
        })
    }else(
        res.json({
            erro: true,
            message: "Pedido não apagado"
        })
    )
})
//mongodb://localhost:27017

mongoose.connect("mongodb://localhost:27017/projeto")
.then(()=>console.log("conectado ao mongodb"))
.catch((err) => console.log("Erro ao conextar ao mongodb"))

app.listen(3333, () => {
    console.log("servidor rodando na porta 3333")
})