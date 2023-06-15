'use strict';

// seed padrao

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) { // inserir em lote
    await queryInterface.bulkInsert('Pessoas', [
      {
        nome: 'Jorge',
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
        nome: 'Jorjaum',
        ativo: true,
        email: "jorjaum@email.com",
        role: "estudante",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Professor Mauricio',
        ativo: true,
        email: "mauricio@email.com",
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
