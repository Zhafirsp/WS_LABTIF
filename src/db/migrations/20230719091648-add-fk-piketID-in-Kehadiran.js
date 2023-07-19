"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Kehadirans", {
      fields: ["piket_id"],
      type: "foreign key",
      name: "fk-piketID-in-Kehadiran",
      references: {
        // Required field
        table: "JadwalPikets",
        field: "piket_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Kehadirans",
      "fk-piketID-in-Kehadiran",
      {}
    );
  },
};
