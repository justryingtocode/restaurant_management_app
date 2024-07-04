// import Sequelize from "@sequelize/core";
import Sequelize from 'sequelize';
// const Sequelize = require("sequelize");
import db from '../config/database.js';
// const db = require("../config/database");

const cityModel = db.sequelize.define(
  "city",
  {
    city_id: {
      type: Sequelize.INTEGER(4),
      autoIncrement: true,
      primaryKey: true,
    },
    city_name: Sequelize.INTEGER(4),
    state_id: Sequelize.INTEGER(4),
  },
)

// module.exports = data;
export default cityModel;