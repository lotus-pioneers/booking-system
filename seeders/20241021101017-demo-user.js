'use strict';
const {faker}=require('@faker-js/faker');
const md5 = require('md5');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fakeUsers = [];
    const roles=['doctor', 'patient'];
    const fakedoctors =[];
    const specializations = ['Dermatology', 'Endocrinologist', 'Oncologist', 'Family Medicine', 'Neurology'];
    const fakepatients =[]
    
    var trole;

    for (let i = 1; i <= 100; i++) {
      trole=roles[Math.floor(Math.random() * roles.length)];
      fakeUsers.push({
        name: faker.person.fullName(),
        password:md5(1234),
        email: faker.internet.email(),
        role:trole,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if(trole=='doctor'){
        fakedoctors.push({
          userId: i,
          specialization: specializations[Math.floor(Math.random() * specializations.length)],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      else{
          fakepatients.push({
            userId: i,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
      }
      

    }

    await queryInterface.bulkInsert('Users', fakeUsers, {});

    // const fakedoctors =[];
    // const specializations = ['Dermatology', 'Endocrinologist', 'Oncologist', 'Family Medicine', 'Neurology'];
    // for (let j = 1; j <= 50; j++) {
    //   fakedoctors.push({
    //     userId: j,
    //     specialization: specializations[Math.floor(Math.random() * specializations.length)],
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });
    // }
    await queryInterface.bulkInsert('Doctors', fakedoctors, {});

    
    await queryInterface.bulkInsert('Patients', fakepatients,{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Doctors', null, {});
    await queryInterface.bulkDelete('Patients', null, {});
  }
};
