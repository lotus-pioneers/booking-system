module.exports = (sequelize, DataTypes) =>{
    const Patient= sequelize.define('Patients', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        userId:{
            type:DataTypes.INTEGER, 
            references:{
              model:'Users',
              key:'id'
            },
            allowNull:false,
          },
        medicalHistory:{
            type:DataTypes.INTEGER,
          },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE, 
          },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,  
          }
    });

    Patient.associate=(models)=>{
        Patient.belongsTo(models.Users, {foreignKey:'userId'});
    }
    return Patient;
    
}


