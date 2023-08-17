"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Penilaians", {
      fields: ["kelas_id"],
      type: "foreign key",
      name: "fk-kelasID-in-Penilaian",
      references: {
        // Required field
        table: "Kelas",
        field: "kelas_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Penilaians",
      "fk-kelasID-in-Penilaian",
      {}
    );
  },
};
