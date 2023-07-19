"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Penilaians", {
      fields: ["krs_id"],
      type: "foreign key",
      name: "fk-krsID-in-Penilaian",
      references: {
        // Required field
        table: "Krs",
        field: "krs_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Penilaians",
      "fk-krsID-in-Penilaian",
      {}
    );
  },
};
