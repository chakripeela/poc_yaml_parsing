const Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://postgres:1234@127.0.0.1:5432/POC_VSC');

module.exports = sequelize;