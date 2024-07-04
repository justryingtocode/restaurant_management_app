// import Sequelize from "@sequelize/core";
import Sequelize from 'sequelize';
// const Sequelize = require("sequelize");
import db from '../config/database.js';
// const db = require("../config/database");
import userModel from './user-model.js';
import addressModel from './address-model.js';

const restaurantModel = db.sequelize.define(
    "restaurants",
    {
        restaurant_id: {
            type: Sequelize.INTEGER(4),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        restaurant_name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        address_id: {
            type: Sequelize.INTEGER(4),
            allowNull: false,
            references: {
                model: addressModel,
                key: 'address_id'
            }
        },
        mapped_user_id: {
            type: Sequelize.INTEGER(4),
            references: {
                model: userModel,
                key: 'user_id'
            }
        }
    },
)

restaurantModel.belongsTo(addressModel, { foreignKey: 'address_id',as: 'address' });
addressModel.hasMany(restaurantModel, { foreignKey: 'address_id',as: 'address' });

export default restaurantModel;