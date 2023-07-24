"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pendaftaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pendaftaran.belongsTo(models.Program, {
        foreignKey: "program_id",
        targetKey: "program_id",
      });
      Pendaftaran.belongsTo(models.Mahasiswa, {
        foreignKey: "nim",
        targetKey: "nim",
      });
    }
  }
  Pendaftaran.init(
    {
      daftar_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
      },
      program_id: {
        allowNull: false,
        type: DataTypes.INTEGER(11),
      },
      tanggal_daftar: DataTypes.DATE,
      nim: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
      nama_mahasiswa: DataTypes.STRING,
      email: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      file_syarat: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("Diterima", "Menunggu", "Ditolak"),
        validate: {
          isIn: {
            args: [["Diterima", "Menunggu", "Ditolak"]],
            msg: "Hanya dapat memilih 3 pilihan yaitu Diterima, Menunggu, Ditolak",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(model) {
          if (!model.status) {
            // default Status -> Menunggu
            model.status = "Menunggu";
          }
        },
      },
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Pendaftaran",
    }
  );
  return Pendaftaran;
};
