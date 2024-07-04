// import Sequelize from "@sequelize/core";
import Sequelize from 'sequelize';
// const Sequelize = require("sequelize");
import db from '../config/database.js';
// const db = require("../config/database");

const stateModel = db.sequelize.define(
  "state",
  {
    state_id: {
      type: Sequelize.INTEGER(4),
      autoIncrement: true,
      primaryKey: true,
    },
    description: Sequelize.STRING(50),
  },
)

// module.exports = data;
export default stateModel;