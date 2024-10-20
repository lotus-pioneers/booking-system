module.exports = (sequelize, DataTypes) =>{
    const Users= sequelize.define('Users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type:DataTypes.STRING, 
            validate:{
                isEmail:{
                    msg:"must be a valid Email address!"
                }
            },
        },
        role:{
            type:DataTypes.ENUM('doctor', 'patient'),
            allowNull:false,
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
    return Users;
    
}


