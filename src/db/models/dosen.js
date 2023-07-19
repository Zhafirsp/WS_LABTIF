"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dosen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dosen.hasMany(models.JadwalPraktik, {
        sourceKey: "dosen_nip",
        foreignKey: "dosen_nip",
      });
    }
  }
  Dosen.init(
    {
      dosen_nip: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(11),
      },
      nama_dosen: DataTypes.STRING,
      email: DataTypes.STRING,
      jenis_pegawai: DataTypes.STRING,
      image_url: DataTypes.STRING,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Dosen",
    }
  );
  return Dosen;
};
