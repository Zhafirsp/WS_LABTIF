"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Pendaftarans", {
      fields: ["program_id"],
      type: "foreign key",
      name: "fk_programID_in_Pendaftaran",
      references: {
        //Required field
        table: "Programs",
        field: "program_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Pendaftarans",
      "fk_programID_in_Pendaftaran",
      {}
    );
  },
};
