"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Kehadirans", {
      absen_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11),
      },
      asisten_id: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      nama_asisten: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      piket_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("Hadir", "Izin", "Alpha"),
      },
      pengganti_id: {
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
    await queryInterface.dropTable("Kehadirans");
  },
};
