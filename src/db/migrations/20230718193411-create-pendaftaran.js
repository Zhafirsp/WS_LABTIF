"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pendaftarans", {
      daftar_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11),
      },
      program_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      tanggal_daftar: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      nim: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      file_syarat: Sequelize.STRING,
      status: {
        allowNull: false,
        type: Sequelize.ENUM("Diterima", "Menunggu", "Ditolak"),
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
    await queryInterface.dropTable("Pendaftarans");
  },
};