'use strict';

 //#1 create faker module
 const faker = require("faker");

//#2 define array called topics and populate it with 10 objects
 let topics = [];

 for(let i = 1 ; i <= 15 ; i++){
   topics.push({
     title: faker.hacker.noun(),
     description: faker.hacker.phrase(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   // bulkInsert metod: is a QueryInterface class that is called and passes the table name, array of objects, which then builds records. 
   return queryInterface.bulkInsert("Topics", topics, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete("Topics", null, {});
  }
};
