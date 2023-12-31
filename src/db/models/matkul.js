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
      Matkul.belongsTo(models.Dosen, {
        foreignKey: "dosen_nip",
        targetKey: "dosen_nip",
      });
      Matkul.hasMany(models.Kelas, {
        sourceKey: "kode_mk",
        foreignKey: "kode_mk",
      });
      Matkul.hasMany(models.JadwalPraktik, {
        sourceKey: "kode_mk",
        foreignKey: "kode_mk",
      });
      Matkul.hasMany(models.Krs, {
        sourceKey: "kode_mk",
        foreignKey: "kode_mk",
      });
    }
  }
  Matkul.init(
    {
      kode_mk: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING(11),
      },
      nama_mk: DataTypes.STRING,
      kurikulum: DataTypes.STRING,
      sks_mk: DataTypes.INTEGER(11),
      dosen_nip: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
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
