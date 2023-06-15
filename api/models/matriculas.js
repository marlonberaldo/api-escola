'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    static associate(models) {
      Matriculas.belongsTo(models.Pessoas, { foreignKey: "estudante_id" })
      Matriculas.belongsTo(models.Turmas, { foreignKey: "turma_id" })
    }
  }
  Matriculas.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
    paranoid: true // enquanto o paranoid for true --> nenhum registro sera veradeiramente apagado da tabela
  });
  return Matriculas;
};