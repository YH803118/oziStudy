"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Member.belongsToMany(models.Member, {
        through: "fk-memberTalble",
      });
    }
  }
  Table.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      leader: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      endDate: DataTypes.DATE,
      tag: DataTypes.STRING,
      userList: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Table",
    }
  );
  return Table;
};
