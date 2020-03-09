const Sequelize = require('sequelize');
const config = require("../tools/config")

const sequelizeGIS = new Sequelize(global.gConfig.database.gis);

module.exports = sequelizeGIS
