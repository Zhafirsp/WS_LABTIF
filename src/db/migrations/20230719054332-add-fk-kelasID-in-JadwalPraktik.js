"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPraktiks", {
      fields: ["kelas_id"],
      type: "foreign key",
      name: "fk-kelasID-in-JadwalPraktik",
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
      "JadwalPraktiks",
      "fk-kelasID-in-JadwalPraktik",
      {}
    );
  },
};
