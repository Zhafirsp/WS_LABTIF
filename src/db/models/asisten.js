"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asisten extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Asisten.belongsTo(models.Mahasiswa, {
        foreignKey: "nim",
        targetKey: "nim",
      });
      Asisten.hasMany(models.JadwalPiket, {
        sourceKey: "asisten_id",
        foreignKey: "asisten_id",
      });
      Asisten.hasMany(models.Kehadiran, {
        sourceKey: "asisten_id",
        foreignKey: "asisten_id",
      });
    }
  }
  Asisten.init(
    {
      asisten_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING(11),
      },
      nim: {
        allowNull: false,
        type: DataTypes.STRING(11),
      },
      nama_asisten: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Nama tidak boleh kosong",
          },
          len: {
            args: [2, 255],
            msg: "Nama harus terdiri dari antara 2 dan 255 karakter.", // Error message I want to display
          },
        },
      },
      golongan: {
        type: DataTypes.ENUM("A", "B", "C"),
        validate: {
          isIn: {
            args: [["A", "B", "C"]],
            msg: "Hanya dapat memilih 3 pilihan yaitu A, B, dan C",
          },
        },
      },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Asisten",
    }
  );
  return Asisten;
};
