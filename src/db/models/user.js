"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Mahasiswa, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
      User.hasOne(models.Laboran, {
        sourceKey: "user_id",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
          len: {
            args: [3, 11],
            msg: "Username harus dengan angka antara 3 dan 11 karakter.", // Error message I want to display
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
          is: {
            args: [
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_/!@#$%^&*.])(?=.{8,})",
            ],
            msg: "Kata sandi harus memiliki setidaknya 8 karakter yang terdiri dari huruf besar dan huruf kecil, angka, simbol (!@#$_%^&*). Contoh: l4B-T!f2023",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Format email tidak valid! Contoh yang benar: simala@email.com",
          },
        },
      },
      no_hp: DataTypes.STRING,
      image_url: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("Laboran", "Asisten", "Mahasiswa"),
        validate: {
          isIn: {
            args: [["Laboran", "Asisten", "Mahasiswa"]],
            msg: "Hanya dapat memilih 3 pilihan yaitu Laboran, Asisten, dan Mahasiswa",
          },
        },
      },
      access_token: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(model) {
          model.password = hashPassword(model.password);
          if (!model.role) {
            // default Mahasiswa
            model.role = "Mahasiswa";
          }
        },
      },
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "User",
    }
  );
  return User;
};
