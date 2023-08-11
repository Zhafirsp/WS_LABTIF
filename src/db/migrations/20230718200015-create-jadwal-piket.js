"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("JadwalPikets", {
      piket_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11),
      },
      kelas_id: Sequelize.INTEGER(11),
      praktik_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      pertemuan: Sequelize.INTEGER(11),
      asisten_id: {
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
    await queryInterface.dropTable("JadwalPikets");
  },
};
