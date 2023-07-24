const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const createGroup = sequelize.define('groupname', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    groupname: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = createGroup;