"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Kelas", {
      kelas_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.INTEGER(11),
      },
      nama_kelas: Sequelize.STRING,
      nama_ruang: Sequelize.STRING,
      kapasitas: Sequelize.INTEGER(11),
      kode_mk: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      periode: Sequelize.STRING,
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
    await queryInterface.dropTable("Kelas");
  },
};
