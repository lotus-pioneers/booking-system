'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
          type:Sequelize.STRING, 
          validate:{
              isEmail:{
                  msg:"must be a valid Email address!"
              }
          },
      },
      role:{
        type:Sequelize.ENUM('doctor', 'patient'),
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, 
      },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,  
      }  
    }),
    queryInterface.createTable('Doctors',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        type:Sequelize.INTEGER, 
        references:{
          model:'Users',
          key:'id'
        },
        allowNull:false,
      },
      specialization:{
        type:Sequelize.ENUM('Dermatology','Endocrinologist','Oncologist','Family Medicine','Neurology'),
        allowNull:false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, 
      },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,  
      }  
    });
    queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        type:Sequelize.INTEGER, 
        references:{
          model:'Users',
          key:'id'
        },
        allowNull:false,
      },
      medicalHistory:{
        type:Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, 
      },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,  
      }
    }),
   queryInterface.createTable("UserTokens", {
      userId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      token: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,  
        }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("UserTokens");
    queryInterface.dropTable('Doctors');
    queryInterface.dropTable('Patients');
    queryInterface.dropTable("Users");
  }
};
