"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kelas.belongsTo(models.Matkul, {
        foreignKey: "kode_mk",
        targetKey: "kode_mk",
      });
      Kelas.hasMany(models.JadwalPraktik, {
        sourceKey: "kelas_id",
        foreignKey: "kelas_id",
      });
      // Kelas.hasOne(models.Krs, {
      //   sourceKey: "nama_kelas",
      //   foreignKey: "nama_kelas",
      // });
    }
  }
  Kelas.init(
    {
      kelas_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER(11),
      },
      nama_kelas: DataTypes.STRING,
      nama_ruang: DataTypes.STRING,
      kapasitas: DataTypes.INTEGER(11),
      kode_mk: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Kelas",
    }
  );
  return Kelas;
};
