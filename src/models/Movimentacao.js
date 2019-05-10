const mongoose = require('mongoose')

const Movimentacao = new mongoose.Schema(
    {
        valor:{
            type: Number,
            required: true
        },
        observacao:{
            type: String
        },
        tipo:{
            type: String,
            required: true
        },
        categoria:{ 
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Movimentacao', Movimentacao);