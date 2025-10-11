const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Candidate = sequelize.define('Candidate', {
    candidate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    membership_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    campaign_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    candidate_position_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'candidate',
    timestamps: false
});

module.exports = Candidate;