"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Krs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Krs.belongsTo(models.Mahasiswa, {
        foreignKey: "nim",
        targetKey: "nim",
      });
      Krs.belongsTo(models.Matkul, {
        foreignKey: "kode_mk",
        targetKey: "kode_mk",
      });
      Krs.belongsTo(models.Kelas, {
        foreignKey: "kelas_id",
        targetKey: "kelas_id",
      });
      Krs.hasMany(models.Penilaian, {
        sourceKey: "krs_id",
        foreignKey: "krs_id",
      });
    }
  }
  Krs.init(
    {
      krs_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11),
      },
      periode_krs: DataTypes.STRING(11),
      kode_mk: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
      kelas_id: DataTypes.INTEGER(11),
      nama_kelas: DataTypes.STRING,
      nim: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Krs",
    }
  );
  return Krs;
};
