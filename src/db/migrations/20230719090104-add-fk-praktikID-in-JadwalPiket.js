"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPikets", {
      fields: ["praktik_id"],
      type: "foreign key",
      name: "fk-praktikID-in-JadwalPiket",
      references: {
        // Required field
        table: "JadwalPraktiks",
        field: "praktik_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "JadwalPikets",
      "fk-praktikID-in-JadwalPiket",
      {}
    );
  },
};
