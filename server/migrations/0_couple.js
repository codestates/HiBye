'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('couples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      is_matching: {
        type: Sequelize.BOOLEAN
      },
      started_at: {
        type: Sequelize.DATE
      },
      sender_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      receiver_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_At: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_At: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('couples');
  }
};