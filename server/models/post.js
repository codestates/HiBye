'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.hasMany(models.Comment, {
        foreignKey: 'post_id',
        onDelete: 'cascade',
      })
      models.Post.belongsTo(models.User, {
        onDelete: "cascade",
        foreignkey: {
          name: "user_id",
          allowNull: false
        }
      })
      models.Post.belongsTo(models.Board, {
        onDelete: "cascade",
        foreignkey: {
          name: "board_id",
          allowNull: false
        }
      })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    shared_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Post',
  });
  return Post;
};