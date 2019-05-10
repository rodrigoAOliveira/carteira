const mongoose = require('mongoose')

const Categoria = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Categoria', Categoria);