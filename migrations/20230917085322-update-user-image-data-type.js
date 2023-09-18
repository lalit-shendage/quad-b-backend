'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'user_image', {
      type: Sequelize.TEXT('long'), // Use an appropriate text data type
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'user_image', {
      type: Sequelize.STRING, // Revert to the previous data type if needed
    });
  },
};
