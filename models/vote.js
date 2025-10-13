const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Vote = sequelize.define('Vote', {
    vote_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    voter_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vote_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'vote',
    timestamps: false
});

module.exports = Vote;