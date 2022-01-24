'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Couple extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Couple.hasMany(models.User, {
        foreignKey: 'couple_id',
        onDelete: 'cascade',
      })
    }
  }
  Couple.init({
    is_matching: DataTypes.BOOLEAN,
    started_at: DataTypes.DATE,
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Couple',
  });
  return Couple;
};