"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kehadiran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kehadiran.belongsTo(models.Asisten, {
        foreignKey: "asisten_id",
        targetKey: "asisten_id",
      });
      Kehadiran.belongsTo(models.JadwalPiket, {
        foreignKey: "piket_id",
        targetKey: "piket_id",
      });
    }
  }
  Kehadiran.init(
    {
      absen_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
      },
      asisten_id: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
      nama_asisten: DataTypes.STRING,
      piket_id: {
        allowNull: false,
        type: DataTypes.INTEGER(11),
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM("Hadir", "Izin", "Alpha"),
        validate: {
          isIn: {
            args: [["Hadir", "Izin", "Alpha"]],
            msg: "Hanya dapat memilih 3 pilihan yaitu Hadir, Izin, dan Alpha",
          },
        },
      },
      pengganti_id: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Kehadiran",
    }
  );
  return Kehadiran;
};
