"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Asistens", {
      asisten_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING(11),
      },
      nim: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      nama_asisten: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: Sequelize.STRING,
      email_kampus: Sequelize.STRING,
      no_hp: Sequelize.STRING,
      bidang_praktikum: Sequelize.STRING,
      golongan: Sequelize.ENUM("A", "B", "C"),
      periode: {
        allowNull: false,
        type: Sequelize.STRING(11),
      },
      is_active: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Asistens");
  },
};
