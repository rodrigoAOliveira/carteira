const Categoria = require('../models/Categoria')
CategoriaController = {}
CategoriaController.index = async (req, res) => {
    const cat = await Categoria.find();
    res.render('pages/categoria',{cat})
}

CategoriaController.store = async (req, res) => {
    await Categoria.create({name:req.body.name});
    const cat = await Categoria.find();
    res.render('pages/categoria', {cat})
}

module.exports = CategoriaController