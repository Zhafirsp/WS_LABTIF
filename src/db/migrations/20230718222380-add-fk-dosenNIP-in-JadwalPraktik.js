"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPraktiks", {
      fields: ["dosen_nip"],
      type: "foreign key",
      name: "fk_dosenNIP_in_JadwalPraktik",
      references: {
        //Required field
        table: "Dosens",
        field: "dosen_nip",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "JadwalPraktiks",
      "fk_dosenNIP_in_JadwalPraktik",
      {}
    );
  },
};
