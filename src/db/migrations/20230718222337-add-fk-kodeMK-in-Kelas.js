"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Kelas", {
      fields: ["kode_mk"],
      type: "foreign key",
      name: "fk_kodeMK_in_Kelas",
      references: {
        //Required field
        table: "Matkuls",
        field: "kode_mk",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Kelas", "fk_kodeMK_in_Kelas", {});
  },
};
