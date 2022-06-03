class Tabelas{
    init(conexao){
        this.conexao = conexao
        this.criarAtentimentos()
    }

    criarAtentimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, carro varchar(20), servico varchar(20) NOT NULL, valor DECIMAL (7,2) NOT NULL, dataAgendamento datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
       
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }else{
                console.log('Tabela criada com sucesso!')
            }
        })
    }
}

module.exports = new Tabelas