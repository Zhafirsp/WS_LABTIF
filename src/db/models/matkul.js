"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Matkul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Matkul.init(
    {
      kode_mk: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(11),
      },
      nama_mk: DataTypes.STRING,
      kurikulum: DataTypes.STRING,
      sks_mk: DataTypes.INTEGER(11),
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Matkul",
    }
  );
  return Matkul;
};
