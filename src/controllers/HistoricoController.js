const Movimentacao = require('../models/Movimentacao')
const Categoria = require('../models/Categoria')
const moment = require('moment')
HistoricoController = {}

HistoricoController.index = async (req, res) => {
    const mov = await Movimentacao.find().sort({"createdAt": 1})
    const cat = await Categoria.find()
    const data = []

    mov.forEach((m,ind) => {
        const tipo = (m.tipo =='E') ? 'Entrada' : 'Saída'
        const createdAt = moment(m.createdAt).format('L')
        const categoria = cat.filter(c => c._id == m.categoria)[0].name

        data.push({
            tipo,createdAt,categoria,observacao: m.observacao,valor: m.valor
        })

    })

    const valorE = mov.filter(m => m.tipo == 'E').reduce((ac, ob) => ac + ob.valor,0)
    const valorS = mov.filter(m => m.tipo == 'S').reduce((ac, ob) => ac + ob.valor,0)

    const historico = [
        valorE,
        valorS
    ]

    res.render('pages/historico',{data,historico})
}

module.exports = HistoricoController