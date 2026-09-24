const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Technology = sequelize.define('Technology', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Technology;