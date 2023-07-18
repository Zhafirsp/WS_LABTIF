"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Program.hasMany(models.Pendaftaran, {
        sourceKey: "program_id",
        foreignKey: "program_id",
      });
    }
  }
  Program.init(
    {
      program_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
      },
      judul: DataTypes.STRING,
      deskripsi: DataTypes.STRING,
      batas_waktu: DataTypes.DATE,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Program",
    }
  );
  return Program;
};
