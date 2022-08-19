'use strict';

const { QueryInterface } = require('sequelize')

module.exports = {
  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {*} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_active_sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
      },
      date_text: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addIndex('user_active_sessions', ['email', 'date_text'])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_active_sessions');
  }
};