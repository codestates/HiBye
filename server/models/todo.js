'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Todo.belongsTo(models.Board, {
        onDelete: "cascade",
        foreignkey: {
          name: 'board_id',
          allowNull: false
        }
      })
    }
  }
  Todo.init({
    contents: DataTypes.STRING,
    is_completed: DataTypes.BOOLEAN,
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Todo',
  });
  return Todo;
};