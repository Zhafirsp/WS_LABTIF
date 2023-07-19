"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPikets", {
      fields: ["asisten_id"],
      type: "foreign key",
      name: "fk-asistenID-in-JadwalPiket",
      references: {
        // Required field
        table: "Asistens",
        field: "asisten_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "JadwalPikets",
      "fk-asistenID-in-JadwalPiket",
      {}
    );
  },
};
