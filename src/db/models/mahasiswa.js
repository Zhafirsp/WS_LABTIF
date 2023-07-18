"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mahasiswa.init(
    {
      nim: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(11),
      },
      nama_mahasiswa: DataTypes.STRING,
      user_id: DataTypes.INTEGER(11),
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Mahasiswa",
    }
  );
  return Mahasiswa;
};
