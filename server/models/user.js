'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
      })
      models.User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        onDelete: 'cascade',
      })
      models.User.belongsTo(models.Couple, {
        onDelete: "cascade",
        foreignkey: {
          name: 'couple_id',
          allowNull: true
        }
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    couple_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'User',
  });
  return User;
};