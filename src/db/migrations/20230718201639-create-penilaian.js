"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Penilaians", {
      nilai_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(11),
      },
      kelas_id: Sequelize.INTEGER(11),
      nama_kelas: Sequelize.STRING,
      krs_id: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      periode_krs: {
        allowNull: false,
        type: Sequelize.INTEGER(11),
      },
      nim: Sequelize.STRING(11),
      nama_mahasiswa: Sequelize.STRING,
      cpmk: Sequelize.INTEGER(11),
      tugas_ke: Sequelize.INTEGER(11),
      nilai: Sequelize.INTEGER(11),
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
    await queryInterface.dropTable("Penilaians");
  },
};
