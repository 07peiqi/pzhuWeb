'use strict';
module.exports = app => {
    const { INTEGER, STRING, DATE } = app.Sequelize;
    const Technology = app.model.define('Technology', {
        id: {
            type: INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING(16),
        },
        created_at: DATE,
        updated_at: DATE,
    },
    {
        underscored: true,
        tableName: 'technology',
    });
    Technology.associate = function() {
        app.model.Technology.hasMany(app.model.Article, { foreignKey: 'technologyid', targetKey: 'id' });
    };

    return Technology;
};
