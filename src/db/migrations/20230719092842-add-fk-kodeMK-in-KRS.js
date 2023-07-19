"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Krs", {
      fields: ["kode_mk"],
      type: "foreign key",
      name: "fk-kodeMK-in-KRS",
      references: {
        // Required field
        table: "Matkuls",
        field: "kode_mk",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Krs", "fk-kodeMK-in-KRS", {});
  },
};
