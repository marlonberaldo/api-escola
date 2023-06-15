'use strict';

// o que sao migrations --> transferencia de dados entre plataformas (db, services)
// migração com o ORM --> alteracoes que fazemos no banco com o ORM, poder voltar o estado da tabela a uma versao anterior, segurança 
// coordenar alterações feitas por diferentes pessoas do time nas tabelas do banco
// RASTREAR E REVERTER --> debugar erros e conflitos

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) { // up --> criamos a migraçao
    await queryInterface.addColumn('Turmas', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Turmas', 'deletedAt'); // dropTable sql --> desfazer tabela do sql
  }
};