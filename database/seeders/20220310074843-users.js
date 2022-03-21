'use strict';
const sampleUsers =  require('../dataFiles/sampleUsers')


module.exports = {
  async up(queryInterface, Sequelize) {
    

    await queryInterface.bulkInsert(
      'Users',
      sampleUsers,
      {
        logging: log => console.log('Ran bulk insert. Log:', log)
      }
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      logging: log => console.log('Ran bulk delete. Log:', log)
    });
  }
};
