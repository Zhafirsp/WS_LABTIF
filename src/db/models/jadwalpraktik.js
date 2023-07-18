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
      // define association here
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
      kelas_id: {
        allowNull: false,
        type: DataTypes.INTEGER(11),
      },
      dosen_nip: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
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