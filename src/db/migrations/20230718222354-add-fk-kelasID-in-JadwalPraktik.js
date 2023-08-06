"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPraktiks", {
      fields: ["kelas_id"],
      type: "foreign key",
      name: "fk_kelasID_in_JadwalPraktik",
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
      "JadwalPraktiks",
      "fk_kelasID_in_JadwalPraktik",
      {}
    );
  },
};
