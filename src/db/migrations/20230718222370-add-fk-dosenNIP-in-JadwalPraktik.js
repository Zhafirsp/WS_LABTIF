"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("JadwalPraktiks", {
      fields: ["dosen_nip"],
      type: "foreign key",
      name: "fk-dosenNIP-in-JadwalPraktik",
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
      "fk-dosenNIP-in-JadwalPraktik",
      {}
    );
  },
};
