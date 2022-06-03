const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const dataAgendamento = moment(atendimento.dataAgendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const validaData = moment(dataAgendamento).isSameOrAfter(dataCriacao)
        const validaCliente = atendimento.cliente.length >= 5
        const validacoes = [
            {
                nome: 'dataAgendamento',
                valido: validaData,
                mensagem: 'Data deve ser maior ou igual a data atual!'
            },
            {
                nome: 'cliente',
                valido: validaCliente,
                mensagem: "Cliente deve ter pelo menos 5 caracteres!"
            }   
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, dataAgendamento}
            const sql = 'INSERT INTO Atendimentos SET ?'
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
        
    }

    listaAtendimentos(res){
        const sql = 'SELECT * FROM Atendimentos'
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaAtendimentoPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados)=>{
            const atendimento = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    editar(id, elemento, res){
        if(elemento.dataAgendamento){
            elemento.dataAgendamento = moment(elemento.dataAgendamento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
        conexao.query(sql, [elemento, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({...elemento, id})
            }
        })
    }

    remove(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }
        })
    }
}


module.exports = new Atendimento