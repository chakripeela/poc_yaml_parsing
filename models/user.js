const Sequelize = require('sequelize');
const sequelize = require('../postgres_config');
var User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING,
      field: 'last_name' 
    }
  }, {
    freezeTableName: true // Model tableName will be the same as the model name
  });
  
  User.sync({force: true}).then(function () {
    // Table created
    // return User.create({
    //   firstName: 'John',
    //   lastName: 'Hancock'
    // });
  });

  module.exports = User;