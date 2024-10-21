'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Appointments",{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'id',
        },
        allowNull: false,
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Patients',
          key: 'id',
        },
        allowNull: false,
      },
      appointmentDate: {
        type: Sequelize.DATEONLY, 
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'canceled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },{
      indexes:[
        {
          fields: ['doctorId', 'appointmentDate'],
          name: 'unique_doctor_appointment_per_day',
        }
      ]
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('Appointments');
  }
};
