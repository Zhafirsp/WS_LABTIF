"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Kehadirans", {
      fields: ["asisten_id"],
      type: "foreign key",
      name: "fk-asistenID-in-Kehadiran",
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
      "Kehadirans",
      "fk-asistenID-in-Kehadiran",
      {}
    );
  },
};
