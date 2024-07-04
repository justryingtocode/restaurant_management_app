import Sequelize from "@sequelize/core";
// const mysql = require('mysql');
// import config from "./config.json";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import * as dotenv from 'dotenv';
dotenv.config();
// require('dotenv').config()

let db = {};

let sequelize;
console.log(process.env.min)
sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
  host: process.env.host,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: parseInt(process.env.max),
    min: parseInt(process.env.min),
    acquire: parseInt(process.env.acquire),
    idle: parseInt(process.env.idle)
  },
  //we use define to disable created on and updated on and we use freezetablename because seq automatically appends s after table name
  define: {
    timestamps: false,
    freezeTableName: true,
  }
}
);
sequelize.sync().then(
  function () {

    console.log("== DB connection sucessful. ==");
  },
  function (err) {
    // catch error here
    console.log("SequelizeError: ", err.message);
  }
);

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "crud"
// });

// connection.connect( (err) => {
//     if(err){
//         console.log('not connected');
//     }
//     else{
//         console.log('connected');
//     }
// });
// connection.on('error', function(err) {
//     console.log("[mysql error]",err);
//   });

// module.exports = sequelize;
// connection.sequelize = sequelize;
db.sequelize = sequelize;
export default db;