module.exports = (sequelize, DataTypes) =>{
    const Doctor= sequelize.define('Doctors', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type:DataTypes.INTEGER
          },
        userId:{
            type:DataTypes.INTEGER, 
            references:{
              model:'Users',
              key:'id'
            },
            allowNull:false,
          },
        specialization:{
            type:DataTypes.ENUM('Dermatology','Endocrinologist','Oncologist','Family Medicine','Neurology'),
            allowNull:false,
          },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE, 
          },
        updatedAt: {
            allowNull: false,
            type:DataTypes.DATE,  
          } 
    });

    Doctor.associate=(models)=>{
        Doctor.belongsTo(models.Users, {foreignKey:'userId'});
    }
    return Doctor;
    
}


