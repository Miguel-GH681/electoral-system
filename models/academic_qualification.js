const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const AcademicQualification = sequelize.define("AcademicQualification", {
    academic_qualification_id: {   
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    graduation_year: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    institution: {
        type: DataTypes.STRING,
        allowNull: false
    },
    candidate_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'academic_qualification',
    timestamps: false
});

module.exports = AcademicQualification;