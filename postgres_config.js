const Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/POC_VSC');

module.exports = sequelize;