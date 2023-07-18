"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penilaian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penilaian.init(
    {
      nilai_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
      },
      krs_id: {
        allowNull: false,
        type: DataTypes.INTEGER(11),
      },
      tugas_ke: DataTypes.INTEGER(11),
      nilai: DataTypes.INTEGER(11),
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Penilaian",
    }
  );
  return Penilaian;
};
