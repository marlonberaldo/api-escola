'use strict';

// seed padrao

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) { // inserir em lote
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'Jorge Delas',
        ativo: true,
        email: "joger1@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Jorge 2',
        ativo: true,
        email: "joger2@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Jorjaum uiui',
        ativo: true,
        email: "uiui@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Professor Maurinho',
        ativo: true,
        email: "maurinho@email.com",
        role: "docente",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Professor Joaquim',
        ativo: true,
        email: "joaquim@email.com",
        role: "docente",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  async down(queryInterface, Sequelize) { // deletar em lote
    await queryInterface.bulkDelete('Pessoas', null, {});

  }
};
