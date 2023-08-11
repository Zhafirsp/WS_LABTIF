"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Pendaftarans", {
      fields: ["nim"],
      type: "foreign key",
      name: "fk-NIM-in-Pendaftaran",
      references: {
        //Required field
        table: "Mahasiswas",
        field: "nim",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Pendaftarans",
      "fk-NIM-in-Pendaftaran",
      {}
    );
  },
};
