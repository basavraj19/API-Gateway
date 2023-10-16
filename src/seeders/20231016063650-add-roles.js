'use strict';

/** @type {import('sequelize-cli').Migration} */


const { ENUM } = require('../utils/common');
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = ENUM.UserRoles;

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [
      {
        name: CUSTOMER,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: ADMIN,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: FLIGHT_COMPANY,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
