const Sequelize = require('sequelize');
const sequelize = require('../postgres_config');
var SdlControlCatalog = sequelize.define('sdl_control_catalog', {
  key: {
    type: Sequelize.TEXT
  },
  metadata: {
    type: Sequelize.JSON,
    field: 'metadata' // Will result in an attribute that is firstName when user facing but first_name in the database
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

SdlControlCatalog.sync();//{force: true}

module.exports = SdlControlCatalog;