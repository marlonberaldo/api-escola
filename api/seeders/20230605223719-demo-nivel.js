'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Niveis', [
      {
        descr_nivel: "básiso",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descr_nivel: "intermediário",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        descr_nivel: "Avançado",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Niveis', null, {});

  }
};
