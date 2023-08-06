"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pengumuman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pengumuman.init(
    {
      info_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(11),
      },
      judul: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      dokumen: DataTypes.STRING,
      link: DataTypes.STRING,
      tanggal_publish: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      is_publish: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      hooks: {
        beforeCreate(model) {
          if (!model.is_publish) {
            // default true --> active
            model.is_publish = true;
          }
        },
      },
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Pengumuman",
    }
  );
  return Pengumuman;
};
