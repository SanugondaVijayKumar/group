const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const groupMessage = sequelize.define('groupmessage', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    groupid: {
        type: Sequelize.UUID,
        allowNull: false
    }
});

module.exports = groupMessage;

