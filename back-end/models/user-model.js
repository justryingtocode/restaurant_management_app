// import Sequelize from "@sequelize/core";
import Sequelize from 'sequelize';
// const Sequelize = require("sequelize");
import db from '../config/database.js';
// const db = require("../config/database");

const userModel = db.sequelize.define(
  "user_table",
  {
    user_id: {
      type: Sequelize.INTEGER(4),
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: Sequelize.STRING(50),
    password: Sequelize.STRING(50),
    address_id: Sequelize.INTEGER(4),
    role: {
      type: Sequelize.ENUM('ADMIN', 'USER'),
      allowNull: false
    }
  },
)

// module.exports = data;
export default userModel;