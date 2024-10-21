module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Doctors',
          key: 'id',
        },
        allowNull: false,
      },
      patientId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Patients',
          key: 'id',
        },
        allowNull: false,
      },
      appointmentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },{
        // appointment per doctor per day
        indexes:[
          {
            fields: ['doctorId', 'appointmentDate'],
            name: 'unique_doctor_appointment_per_day',
          }
        ]
      });
  
    
    return Appointment;
  };
  