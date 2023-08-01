"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Matkuls", {
      fields: ["dosen_nip"],
      type: "foreign key",
      name: "fk-dosenNIP-in-Matkul",
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
      "Matkuls",
      "fk-dosenNIP-in-Matkul",
      {}
    );
  },
};
