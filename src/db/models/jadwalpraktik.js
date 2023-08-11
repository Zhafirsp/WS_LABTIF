"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JadwalPraktik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JadwalPraktik.belongsTo(models.Matkul, {
        foreignKey: "kode_mk",
        targetKey: "kode_mk",
      });
      JadwalPraktik.belongsTo(models.Kelas, {
        foreignKey: "kelas_id",
        targetKey: "kelas_id",
      });
      JadwalPraktik.belongsTo(models.Dosen, {
        foreignKey: "dosen_nip",
        targetKey: "dosen_nip",
      });
      JadwalPraktik.hasMany(models.JadwalPiket, {
        sourceKey: "praktik_id",
        foreignKey: "praktik_id",
      });
    }
  }
  JadwalPraktik.init(
    {
      praktik_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER(11),
      },
      periode: DataTypes.STRING(11),
      pertemuan: DataTypes.INTEGER(11),
      hari: DataTypes.STRING,
      jam_mulai: DataTypes.TIME,
      jam_selesai: DataTypes.TIME,
      kode_mk: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
      kelas_id: DataTypes.INTEGER(11),
      dosen_nip: DataTypes.STRING(11),
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "JadwalPraktik",
    }
  );
  return JadwalPraktik;
};
