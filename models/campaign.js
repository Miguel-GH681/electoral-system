const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');


const Campaign = sequelize.define('Campaign', {
    campaign_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    campaign_state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    measure_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    votes: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'campaign',
    timestamps: false
});

module.exports = Campaign;