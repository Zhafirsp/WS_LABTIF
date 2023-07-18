// "use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Laborans", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk-userID-in-Laboran",
      references: {
        table: "Users",
        field: "user_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "Laborans",
      "fk-userID-in-Laboran",
      {}
    );
  },
};
