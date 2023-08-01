"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Matkuls", {
      kode_mk: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING(11),
      },
      nama_mk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kurikulum: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sks_mk: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      dosen_nip: Sequelize.STRING(11),
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
    await queryInterface.dropTable("Matkuls");
  },
};
