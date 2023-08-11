"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPraktiks", {
      fields: ["kode_mk"],
      type: "foreign key",
      name: "fk-kodeMK-in-JadwalPraktik",
      references: {
        //Required field
        table: "Matkuls",
        field: "kode_mk",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "JadwalPraktiks",
      "fk-kodeMK-in-JadwalPraktik",
      {}
    );
  },
};
