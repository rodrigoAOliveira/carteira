const Movimentacao = require('../models/Movimentacao')
const Categoria = require('../models/Categoria')
HomeController = {}

HomeController.index = async (req, res) => {
    const mov = await Movimentacao.find()
    const cat = await Categoria.find()

    let dados = []

    cat.forEach(c => {
        dados.push({
            name: c.name,
            id: c._id.toString(),
            entrada: 0,
            saida: 0
        })
    });
    
    dados.forEach((c,ind) => {
        const valorE = mov.filter(m => m.categoria == c.id && m.tipo == 'E').reduce((ac, ob) => ac + ob.valor,0)
        const valorS = mov.filter(m => m.categoria == c.id && m.tipo == 'S').reduce((ac, ob) => ac + ob.valor,0)

        dados[ind] = {...c, entrada: valorE, saida: valorS}
        
    });
    
    console.log(dados)

    res.render('pages/home',{dados})
}

module.exports = HomeController