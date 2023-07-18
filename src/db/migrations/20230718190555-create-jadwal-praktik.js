"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("JadwalPraktiks", {
      praktik_id: {
        allowNull: false,
        primaryKey: true,
        unique: false,
        type: Sequelize.INTEGER(11),
      },
      periode: Sequelize.STRING(11),
      pertemuan: Sequelize.INTEGER(11),
      hari: Sequelize.STRING,
      jam_mulai: Sequelize.TIME,
      jam_selesai: Sequelize.TIME,
      kelas_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      dosen_nip: {
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
    await queryInterface.dropTable("JadwalPraktiks");
  },
};
