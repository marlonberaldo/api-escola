const Services = require('./Services');
const dataBase = require('../models');

const { Op } = require('sequelize');

class NiveisServices extends Services {
  constructor() {
    super('Niveis')
  }

  // metodos especificos do controlador de Niveis

}

module.exports = NiveisServices;