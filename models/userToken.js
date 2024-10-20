module.exports = (sequelize, DataTypes) =>{
    
    const UserTokens = sequelize.define('UserTokens', {
        userId:{
            type:DataTypes.INTEGER,
            references:{
              model:'Users',
              key:'id'
            },
            onDelete:'CASCADE'
          },
        token: {
              type: DataTypes.TEXT,
              allowNull: false
          },
        created_at: {
              type: DataTypes.DATE,
              defaultValue: DataTypes.NOW
          },
        updatedAt: {
              allowNull: false,
              type: DataTypes.DATE,  
            }
    });
        UserTokens.associate=(models)=>{
            UserTokens.belongsTo(models.Users, {foreignKey:'userId'});
        }
        return UserTokens;
    }
    