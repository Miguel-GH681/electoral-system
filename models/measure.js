const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Measure = sequelize.define('Measure', {
    measure_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'measure',
    timestamps: false
});

module.exports = Measure;