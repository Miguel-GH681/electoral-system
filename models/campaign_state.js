const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const CampaignState = sequelize.define('CampaignState', {
    campaign_state_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'campaign_state',
    timestamps: false
});

module.exports = CampaignState;