"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JadwalPiket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JadwalPiket.belongsTo(models.Asisten, {
        foreignKey: "asisten_id",
        targetKey: "asisten_id",
      });
      JadwalPiket.belongsTo(models.Kelas, {
        foreignKey: "kelas_id",
        targetKey: "kelas_id",
      });
      JadwalPiket.belongsTo(models.JadwalPraktik, {
        foreignKey: "praktik_id",
        targetKey: "praktik_id",
      });
      JadwalPiket.hasMany(models.Kehadiran, {
        sourceKey: "piket_id",
        foreignKey: "piket_id",
      });
    }
  }
  JadwalPiket.init(
    {
      piket_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
      },
      kelas_id: DataTypes.INTEGER(11),
      praktik_id: {
        allowNull: false,
        type: DataTypes.INTEGER(11),
      },
      pertemuan: DataTypes.INTEGER(11),
      asisten_id: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "JadwalPiket",
    }
  );
  return JadwalPiket;
};
