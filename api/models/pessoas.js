'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: "docente_id" }) // relação entre 1 -> N, Pessoas -> Turmas

      Pessoas.hasMany(models.Matriculas, {
        foreignKey: "estudante_id",
        scope: { // where na query sql
          status: "confirmado", // filtra os registos com status confirmado 
        },
        as: "aulasMatriculadas" // get, set, create
      }) // relação 1 -< N, Pessoas -> Matriculas
      // escopos de associacao vao aqui
    }
  }

  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado.length < 3) throw new Error("O campo nome deve ter mais de 3 caacateres")
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dado do tipo email invalidos'
        },
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: { // escopo padrao
      where: {
        ativo: true
      }
    },
    scopes: { // os escopos que nao sao padrao sao chamados pelo nome
      todos: {
        where: {}
        // constraints
      }
    },
  });
  return Pessoas;
};