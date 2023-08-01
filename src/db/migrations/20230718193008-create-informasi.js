"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Informasis", {
      info_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dokumen: Sequelize.STRING,
      link: Sequelize.STRING,
      tanggal_publish: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      is_publish: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Informasis");
  },
};
