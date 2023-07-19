"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Krs", {
      fields: ["nim"],
      type: "foreign key",
      name: "fk-NIM-in-KRS",
      references: {
        // Required field
        table: "Mahasiswas",
        field: "nim",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Krs", "fk-NIM-in-KRS", {});
  },
};
