"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Laboran extends Model {
    static associate(models) {
      Laboran.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });
    }
  }
  Laboran.init(
    {
      nip: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING(11),
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER(11),
      },
      nama_laboran: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Nama tidak boleh kosong",
          },
          len: {
            args: [2, 255],
            msg: "Nama harus terdiri dari antara 2 dan 255 karakter.",
          },
        },
      },
      jenis_pegawai: DataTypes.STRING,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Laboran",
    }
  );
  return Laboran;
};
