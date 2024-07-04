// import Sequelize from "@sequelize/core";
import Sequelize from 'sequelize';
// const Sequelize = require("sequelize");
import db from '../config/database.js';
import stateModel from './state-model.js';
import cityModel from './city-model.js';
// const db = require("../config/database");

const addressModel = db.sequelize.define(
  "address-table",
  {
    address_id: {
      type: Sequelize.INTEGER(4),
      autoIncrement: true,
      primaryKey: true,
    },
    address_line1: Sequelize.STRING(50),
    city_id: Sequelize.INTEGER(4),
    state_id: Sequelize.INTEGER(4),
  },
)
addressModel.belongsTo(cityModel, { foreignKey: 'city_id',as: 'city' });
addressModel.belongsTo(stateModel, { foreignKey: 'state_id',as: 'state' });
// module.exports = data;
export default addressModel;