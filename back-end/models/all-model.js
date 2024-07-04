// import express from "express";
// const express = require("express")
import userModel from "./user-model.js";
import cityModel from "./city-model.js";
import stateModel from "./state-model.js";
import restaurantModel from "./restaurant-model.js";

import Sequelize from "sequelize";
import bcrypt from 'bcrypt';
import addressModel from "./address-model.js";
// const bcrypt = require("bcrypt");
// const data = require("./seq")
// const Sequelize = require("sequelize");

const sModelData = {};

sModelData.getAllUsers = async (req, res) => {
    let content = await userModel.findAll();
    return content;
}

sModelData.getStates = async (req, res) => {
    let result = { data: null }
    let content = await stateModel.findAll();
    if (content) {
        result.code = 201,
            result.data = content
    }
    else {
        result.code = 404,
            result.data = []
    }
    return result;
}

sModelData.getCities = async (req, res) => {
    let result = { data: null }
    const id = req.params.id;
    const content = await cityModel.findAll({
        where: {
            state_id: id
        }
    });
    if (content) {
        result.code = 201,
            result.data = content
    }
    else {
        result.code = 404,
            result.data = []
    }
    return result;
}

sModelData.getRestaurantById = async (req, res) => {
    let result = { data: null }
    const id = req.params.id;
    const content = await restaurantModel.findOne({
        where: {
            restaurant_id: id
        },
        include: [{
            model: addressModel,
            as: 'address', // Alias for the joined model
            required: true,
            include: [
                {
                    model: cityModel,
                    as: 'city',
                    attributes: ['city_name', 'city_id']
                },
                {
                    model: stateModel,
                    as: 'state',
                    attributes: ['description', 'state_id']
                }
            ]
        }]
    });
    if (content) {
        let data = content.get({ plain: true });
        const modifiedData = {
            ...data,
            city_name: data.address.city ? data.address.city.city_name : null,
            city_id: data.address.city ? data.address.city.city_id : null,
            state_name: data.address.state ? data.address.state.description : null,
            state_id: data.address.state ? data.address.state.state_id : null,
            address_line1: data.address ? data.address.address_line1 : null,
            address: undefined, // Remove nested address object
        };
        result.code = 201,
            result.data = modifiedData;
    }
    else {
        result.code = 404,
            result.data = []
    }
    return result;
}


sModelData.getAllRestaurants = async (req, res) => {
    let result = { data: null }
    let restaurant = await restaurantModel.findAll({
        include: [{
            model: addressModel,
            as: 'address', // Alias for the joined model
            required: true,
            include: [
                {
                    model: cityModel,
                    as: 'city',
                    attributes: ['city_name', 'city_id']
                },
                {
                    model: stateModel,
                    as: 'state',
                    attributes: ['description', 'state_id']
                }
            ]
        }]
    });
    if (restaurant.length) {

        let content = restaurant.map(restaurant => {
            let data = restaurant.get({ plain: true });
            console.log(data, 'sdsd')
            return {
                ...data,
                city_name: data.address.city ? data.address.city.city_name : null,
                city_id: data.address.city ? data.address.city.city_id : null,
                state_name: data.address.state ? data.address.state.description : null,
                state_id: data.address.state ? data.address.state.state_id : null,
                address_line1: data.address ? data.address.address_line1 : null,
                address: undefined, // Remove nested address object
            };
        });
        if (content) {
            result.code = 201;
            result.message = 'Fetched successfully'
            result.data = content;
            result.total_records = restaurant.length;
        }
        return result;
    }
    else {
        result.code = 404;
        result.message = 'No restaurants found, please add.'
        return result;
    }
}


sModelData.addUser = async (req, res) => {
    let result = { data: null }
    const pswd = await bcrypt.genSalt(10);
    // const { addressLine1, addressLine2, city, state, addresscol } = req.body;
    const { name, address_id, pwd, role, city_id } = req.body

    const password = await bcrypt.hash(req.body.pwd, pswd);
    const curentDate = new Date();
    const addUserDetails = await userModel.create({
        user_name: name,
        password: password,
        role: role,
        address_id: address_id,
        // timestamp: curentDate
    })
    if (addUserDetails) {
        result.code = 201,
            result.data = addUserDetails
    }
    else {
        result.data = [],
            result.code = 404
    }
    return result;
}

sModelData.addRestaurant = async (req, res) => {
    let result = { data: null };

    const { mapped_user_id, restaurant_name, city_id, state_id, address_line1 } = req.body;
    try {
        const addressData = await addressModel.create({
            city_id: city_id,
            state_id: state_id,
            address_line1: address_line1,
        })
        if (addressData) {
            const restaurantData = await restaurantModel.create({
                restaurant_name: restaurant_name,
                mapped_user_id: mapped_user_id,
                address_id: addressData.address_id
            })
            if (restaurantData) {
                result.code = 201;
                result.data = restaurantData;
            }
            else {
                result.data = [];
                result.code = 404;
            }
        }
        return result;

    } catch (error) {
        console.error('Error addding restaurant', error);
        result.code = 500;
        result.data = { error: 'Internal Server Error' };
    }
}
sModelData.addCities = async (req, res) => {
    let result = { data: null };

    try {
        const cities = req.body.map(item => ({
            city_id: item.cityID,
            city_name: item.cityDes.trim(),
            state_id: item.stateID
        }));

        const addCityDetails = await cityModel.bulkCreate(cities, { validate: true });

        if (addCityDetails) {
            result.code = 201;
            result.data = addCityDetails;
        } else {
            result.data = [];
            result.code = 404;
        }
    } catch (error) {
        console.error('Error inserting cities:', error);
        result.code = 500;
        result.data = { error: 'Internal Server Error' };
    }

    return result;
};

sModelData.addState = async (req, res) => {
    let result = { data: null };

    try {
        const states = req.body.map(item => ({
            state_id: item.id,
            description: item.value
        }));

        const addStateDetails = await stateModel.bulkCreate(states, { validate: true });

        if (addStateDetails) {
            result.code = 201;
            result.data = addStateDetails;
        } else {
            result.data = [];
            result.code = 404;
        }
    } catch (error) {
        console.error('Error inserting cities:', error);
        result.code = 500;
        result.data = { error: 'Internal Server Error' };
    }

    return result;
};

sModelData.updateRestaurant = async (req, res) => {
    let result = { data: null };
    const restaurant_id = req.params.id;
    const { mapped_user_id, restaurant_name, city_id, state_id, address_line1, address_id } = req.body;
    try {
        console.log(restaurant_id)
        const [updated] = await restaurantModel.update({ restaurant_name: restaurant_name }, {
            where: { restaurant_id: restaurant_id }
        });
        console.log(updated)
        if (updated) {
            await addressModel.update(
                { city_id : city_id, state_id: state_id, address_line1: address_line1 },
                {
                    where: { address_id: address_id }
                }
            );
            result.data = 'success';
            result.code = 201;
            return result;
        }
        else {
            result.data = 'Failed';
            result.code = 500;
            return result;
        }
    } catch (error) {
        console.error(error);
        result.data = 'Failed';
        result.code = 500;
        return result;
    }
}

sModelData.loginUser = async (req, res) => {
    let result = { data: null };
    const { user_name, password } = req.body;
    try {
        const user = await userModel.findOne({
            where: {
                user_name
            }
        });
        if (!user || user.password !== password) {
            result.code = 401;
            result.data = user;
            result.message = 'Invalid username or password';
        }
        else if (user && user.password == password) {
            result.code = 201;
            result.data = user;
            result.message = 'Login successful';
        }
    }
    catch (error) {
        console.error('Error inserting cities:', error);
        result.code = 500;
        result.data = { error: 'Internal Server Error' };
    }
    return result;
}

export default sModelData;