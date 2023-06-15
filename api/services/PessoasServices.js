const Services = require('./Services');
const dataBase = require('../models');

class PessoasServices extends Services { //heranca
  constructor() {
    super('Pessoas')
    this.matriculas = new Services('Matriculas') // nova instancia
  }

  // metodos especificos do controlador de pessoas

  async pegaRegistrosAtivos(where = {}) {
    return dataBase[this.nomeDoModelo].findAll({ where: { ...where } })
  }

  async pegaTodosOsRegistros(where = {}) {
    return dataBase[this.nomeDoModelo]
      .scope('todos')
      .findAll({ where: { ...where } })
  }

  async cancelaPessoaEMatriculas(estudadeId) {
    return dataBase.sequelize.transaction(async transacao => {
      await super.atualizaRegistro({ ativo: false }, estudadeId, { transaction: transacao })
      await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudadeId }, { transaction: transacao })
    })
  }

  async pegaMatriculasPorEstudante(where = {}) {
    const matriculas = await database[this.nomeDoModelo]
      .findOne({ where: { ...where } })
    return matriculas.getAulasMatriculadas()
  }

}

module.exports = PessoasServices;