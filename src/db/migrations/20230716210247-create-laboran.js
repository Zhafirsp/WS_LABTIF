"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Laborans", {
      nip: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      nama_laboran: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Laborans");
  },
};
