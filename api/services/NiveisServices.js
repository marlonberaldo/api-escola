const Services = require('./Services');
const dataBase = require('../models');

const { Op } = require('sequelize');

class NiveisServices extends Services {
  constructor() {
    super('Niveis')
  }

  // metodos especificos do controlador de Niveis
  async pegaNivelPorNome(name) {
    return dataBase[this.nomeDoModelo].findAll({ where: { descr_nivel: { [Op.like]: `%${name}%` } } })
  }

}

module.exports = NiveisServices;