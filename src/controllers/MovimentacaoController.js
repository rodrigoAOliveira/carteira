const Movimentacao = require('../models/Movimentacao')
const Categoria = require('../models/Categoria')
MovimentacaoController = {}
const moment = require('moment')
MovimentacaoController.index = async (req, res) => {
    const mov = await Movimentacao.find()
    const cat = await Categoria.find()

    let saldo = 0
    mov.forEach(m => {
        if(m.tipo == 'E'){
            saldo += m.valor
        }else{
            saldo += m.valor *(-1)
        }
    });

    res.render('pages/movimentacao',{mov,cat,saldo})
}

MovimentacaoController.store = async (req, res) => {
    let mov = {}
    mov.valor = parseFloat(req.body.valor.replace(',','.'))
    mov.tipo = req.body.tipo
    mov.categoria = req.body.categoria
    mov.observacao = req.body.observacao

    await Movimentacao.create(mov);
    const cat = await Categoria.find()
    mov = await Movimentacao.find()

    let saldo = 0
    mov.forEach(m => {
        if(m.tipo == 'E'){
            saldo += m.valor
        }else{
            saldo += m.valor *(-1)
        }
    });
    console.log(mov)
    res.render('pages/movimentacao',{mov,cat,saldo})
}

module.exports = MovimentacaoController