"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Krs", {
      fields: ["kelas_id"],
      type: "foreign key",
      name: "fk-kelasID-in-KRS",
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
    await queryInterface.removeConstraint("Krs", "fk-kelasID-in-KRS", {});
  },
};
