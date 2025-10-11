const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const UserApp = sequelize.define('UserApp', {
    membership_number: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dpi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'user_app',
    timestamps: false
});

module.exports = UserApp;