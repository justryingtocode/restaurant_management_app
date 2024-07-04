import sModelService from "../services/login-services.js";

const sModelController = {};

sModelController.getAllUsers = async (req, res, next) => {
    const data = await sModelService.getAllUsers(req, res);
    res.json(data, req, res);
}

sModelController.getAllRestaurants = async (req, res, next) => {
    const data = await sModelService.getAllRestaurants(req, res);
    res.json(data, req, res);
}

sModelController.getRestaurantById = async (req, res, next) => {
    const data = await sModelService.getRestaurantById(req, res);
    res.json(data, req, res);
}

sModelController.getCities = async (req, res, next) => {
    const data = await sModelService.getCities(req, res);
    res.json(data, req, res);
}

sModelController.getStates = async (req, res, next) => {
    const data = await sModelService.getStates(req, res);
    res.json(data, req, res);
}

sModelController.addUser = async (req, res, next) => {
    const data = await sModelService.addUser(req, res);
    res.json(data, req, res);
}

sModelController.addCities = async (req, res, next) => {
    const data = await sModelService.addCities(req, res);
    res.json(data, req, res);
}

sModelController.addRestaurant = async (req, res, next) => {
    const data = await sModelService.addRestaurant(req, res);
    res.json(data, req, res);
}

sModelController.loginUser = async (req, res, next) => {
    const data = await sModelService.loginUser(req, res);
    res.json(data, req, res);
}

sModelController.addStates = async (req, res, next) => {
    const data = await sModelService.addStates(req, res);
    res.json(data, req, res);
}

sModelController.updateRestaurant = async (req, res, next) => {
    const data = await sModelService.updateRestaurant(req, res);
    res.json(data, req, res);
}


// module.exports = cronController;
export default sModelController;