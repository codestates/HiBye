'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      contents: {
        type: Sequelize.STRING
      },
      shared_at: {
        type: Sequelize.DATE
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      board_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'boards',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};
