"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPikets", {
      fields: ["kelas_id"],
      type: "foreign key",
      name: "fk-kelasID-in-JadwalPiket",
      references: {
        //Required field
        table: "Kelas",
        field: "kelas_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "JadwalPikets",
      "fk-kelasID-in-JadwalPiket",
      {}
    );
  },
};
