'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      theme: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      couple_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: {
          model: 'couples',
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
    await queryInterface.dropTable('boards');
  }
};