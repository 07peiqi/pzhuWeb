'use strict';

module.exports = app => {
    const {
        INTEGER,
        DATE,
        STRING,
        TEXT
    } = app.Sequelize;
    const UserDomain = app.model.define('UserDomain', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement:true
        },
        user_id:STRING(16),
        domain_id:INTEGER(10),
    },
    {
        freezeTableName: true,  
        tableName: 'major',       
        timestamps: false     
    })
    UserDomain.associate = function(){
        
        app.model.UserDomain.belongsTo(app.model.User,{foreignKey:'user_id',targetKey:'id'});
        app.model.UserDomain.belongsTo(app.model.Domain,{foreignKey:'domain_id',targetKey:'id'});
    }
 
    return UserDomain;
}