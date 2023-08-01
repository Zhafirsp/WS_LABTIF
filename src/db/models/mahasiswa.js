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
      Mahasiswa.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });
      Mahasiswa.hasOne(models.Asisten, {
        sourceKey: "nim",
        foreignKey: "nim",
      });
      Mahasiswa.hasOne(models.Pendaftaran, {
        sourceKey: "nim",
        foreignKey: "nim",
      });
      Mahasiswa.hasMany(models.Krs, {
        sourceKey: "nim",
        foreignKey: "nim",
      });
    }
  }
  Mahasiswa.init(
    {
      nim: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING(11),
      },
      nama_mahasiswa: DataTypes.STRING,
      email: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      periode_masuk: DataTypes.STRING,
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
