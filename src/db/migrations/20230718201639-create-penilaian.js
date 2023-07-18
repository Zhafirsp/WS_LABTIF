"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Penilaians", {
      nilai_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11),
      },
      krs_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      tugas_ke: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      nilai: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Penilaians");
  },
};
