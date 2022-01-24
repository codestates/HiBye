'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Board.hasMany(models.Todo, {
        foreignKey: 'board_id',
        onDelete: 'cascade',
      })
      models.Board.hasMany(models.Post, {
        foreignKey: 'board_id',
        onDelete: 'cascade',
      })
      models.Board.belongsTo(models.Couple, {
        onDelete: "cascade",
        foreignkey: {
          name: 'couple_id',
          allowNull: true
        }
      })
    }
  }
  Board.init({
    name: DataTypes.STRING,
    theme: DataTypes.STRING,
    category: DataTypes.STRING,
    desc: DataTypes.STRING,
    couple_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Board',
  });
  return Board;
};