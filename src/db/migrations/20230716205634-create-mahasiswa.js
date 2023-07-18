"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mahasiswas", {
      nim: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(11),
      },
      nama_mahasiswa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
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
    await queryInterface.dropTable("Mahasiswas");
  },
};
