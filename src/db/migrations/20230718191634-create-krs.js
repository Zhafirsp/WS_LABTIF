"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Krs", {
      krs_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      periode_krs: Sequelize.STRING(11),
      kode_mk: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      kelas_id: Sequelize.INTEGER(11),
      nama_kelas: Sequelize.STRING,
      nim: {
        allowNull: false,
        type: Sequelize.STRING(11),
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
    await queryInterface.dropTable("Krs");
  },
};
