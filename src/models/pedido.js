import {model, Schema} from "mongoose";

const pedidoSchema = new Schema({
    numero: {type:Number, required:true},
    mesa: {type: Schema.Types.ObjectId, ref: 'Mesas', required:true},
    pratos: [{type:Schema.Types.ObjectId, ref: 'Pratos'}]
})

const Pedido = model('Pedido', comandaSchema)

export {Pedido}