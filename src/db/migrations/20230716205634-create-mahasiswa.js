"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mahasiswas", {
      nim: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING(11),
      },
      nama_mahasiswa: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      user_id: Sequelize.INTEGER(11),
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
