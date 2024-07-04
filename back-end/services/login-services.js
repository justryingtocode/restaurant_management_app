import sModelData from "../models/all-model.js";


const sModelService = {};

sModelService.getAllUsers = async (req, res) => {
    const cronData = await sModelData.getAllUsers(req, res);
    return cronData;
}
sModelService.getCities = async (req, res) => {
    const cronData = await sModelData.getCities(req, res);
    return cronData;
}

sModelService.getStates = async (req, res) => {
    const cronData = await sModelData.getStates(req, res);
    return cronData;
}

sModelService.getAllRestaurants = async (req, res) => {
    const cronData = await sModelData.getAllRestaurants(req, res);
    return cronData;
}

sModelService.getRestaurantById = async (req, res) => {
    const cronData = await sModelData.getRestaurantById(req, res);
    return cronData;
}

sModelService.addUser = async (req, res) => {
    const data = await sModelData.addUser(req, res);
    return {
        data
    };
}

sModelService.addRestaurant = async (req, res) => {
    const data = await sModelData.addRestaurant(req, res);
    return data;
}


sModelService.loginUser = async (req, res) => {
    const data = await sModelData.loginUser(req, res);
    return {
        data
    };
}


sModelService.addCities = async (req, res) => {
    const data = await sModelData.addCities(req, res);
    return data;
}

sModelService.addStates = async (req, res) => {
    const data = await sModelData.addState(req, res);
    return data;
}

sModelService.updateRestaurant = async (req, res) => {
    const data = await sModelData.updateRestaurant(req, res);
    return data;
}


// module.exports = cronService;
export default sModelService;