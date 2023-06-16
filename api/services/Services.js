// services faz a interface com os modelos, cuidar dos metodos comuns a todos os modelos
// se conectam com a database, processam os dados e mandam de volta para o controlador

const dataBase = require('../models')
const { Op } = require('sequelize');

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo; // recebe o nome do modelo como parametro
  }

  async pegarTodosOsRegistros(where = {}) {
    return dataBase[this.nomeDoModelo].findAll({ where: { ...where } })
  }

  async pegaUmRegistro(where = {}) {
    return dataBase[this.nomeDoModelo].findOne({ where: { ...where } })
  }

  async pegaRegistroPorNome(name, field) {

    if (name.length < 3) {
      throw new Error("A query deve ter pelo menos três caracteres");
    }

    const query = {
      where: {
        [field]: {
          [Op.like]: `%${name}%`
        }
      }
    };

    return dataBase[this.nomeDoModelo].findAll(query)
  }

  async criaRegistro(dados) {
    return dataBase[this.nomeDoModelo].create(dados)
  }

  async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
    return dataBase[this.nomeDoModelo]
      .update(dadosAtualizados, { where: { id: id } }, transacao)
  }

  async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
    return dataBase[this.nomeDoModelo]
      .update(dadosAtualizados, { where: { ...where } }, transacao)
  }

  async apagaRegistro(id) {
    return dataBase[this.nomeDoModelo].destroy({ where: { id: id } }) //soft delete ativo
  }

  async restauraRegistro(id) {
    return dataBase[this.nomeDoModelo].restore({ where: { id: id } })
  }

  async consultaRegistroApagado(id) {
    return dataBase[this.nomeDoModelo]
      .findOne({ paranoid: false, where: { id: Number(id) } })
  }

  async encontraEContaRegistros(where = {}, agregadores) {
    return dataBase[this.nomeDoModelo]
      .findAndCountAll({ where: { ...where }, ...agregadores })
  }

}

module.exports = Services;