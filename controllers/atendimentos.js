const atendimentos = require('../models/atendimentos')
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.listaAtendimentos(res)
    })

    app.get('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)

        Atendimento.buscaAtendimentoPorId(id, res)
    })

    app.post('/atendimentos', (req, res,) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
        
    })

    app.patch('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        const elemento = req.body

        Atendimento.editar(id, elemento, res)
    })

    app.delete('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)

        Atendimento.remove(id, res)
    })

}