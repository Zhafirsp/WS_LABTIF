"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Mahasiswas", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk-userID-in-Mahasiswa",
      references: {
        table: "Users",
        field: "user_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Mahasiswas",
      "fk-userID-in-Mahasiswa",
      {}
    );
    /**
     * Add reverting commands here.
     *
     * Example:
     */
  },
};
