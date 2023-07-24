const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const userGroup = sequelize.define('usergroup', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    groupname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = userGroup;