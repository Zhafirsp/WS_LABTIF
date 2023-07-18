"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Asistens", {
      fields: ["nim"],
      type: "foreign key",
      name: "fk-NIM-in-Asisten",
      references: {
        table: "Mahasiswas",
        field: "nim",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Asistens", "fk-NIM-in-Asisten", {});
  },
};
