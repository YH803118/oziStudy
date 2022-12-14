"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Member.belongsToMany(models.Table, { through: "fk-memberTalble" });
    }
  }
  Member.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      tag: DataTypes.STRING,
      studyList: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
