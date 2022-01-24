'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        onDelete: "cascade",
        foreignkey: {
          name: 'user_id',
          allowNull: false
        }
      })
      models.Comment.belongsTo(models.Post, {
        onDelete: "cascade",
        foreignkey: {
          name: 'post_id',
          allowNull: false
        }
      })
    }
  }
  Comment.init({
    contents: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Comment',
  });
  return Comment;
};