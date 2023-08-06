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
      nama_mahasiswa: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: Sequelize.STRING,
      email_kampus: Sequelize.STRING,
      no_hp: Sequelize.STRING,
      file_syarat: Sequelize.STRING,
      bidang_praktikum: Sequelize.STRING,
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
