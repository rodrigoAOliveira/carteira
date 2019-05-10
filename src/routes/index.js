const express = require('express')
const routes = express.Router()
const CategoriaController = require('../controllers/CategoriaController')
const MovimentacaoController = require('../controllers/MovimentacaoController')
const HomeController = require('../controllers/HomeController')
const HistoricoController = require('../controllers/HistoricoController')
const {Parser} = require('json2csv')
const fs = require('fs')
const {promisify} = require('util')
const createFile = promisify(fs.writeFile)

const Movimentacao = require('../models/Movimentacao')

routes.get('/',HomeController.index);

routes.get('/categorias',CategoriaController.index)
routes.post('/categorias',CategoriaController.store)

routes.get('/movimentacao',MovimentacaoController.index)
routes.post('/movimentacao',MovimentacaoController.store)

routes.get('/historico',HistoricoController.index);

routes.get('/csv',async(req, res ) =>{

    const mov = await Movimentacao.find()
    const fields = ['valor','tipo', 'categoria', 'observacao', 'createdAt'];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(mov);
    
    await createFile('mov.csv', csv)
    var file = __dirname + '../../../mov.csv';
    res.download(file);
});




module.exports = routes