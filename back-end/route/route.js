import express from "express";
import sModelController from "../controllers/login-controller.js";
const routes = express.Router();



// post
routes.get("/get-users", sModelController.getAllUsers);
routes.get("/get-restaurants", sModelController.getAllRestaurants);
routes.get("/get-cities/:id", sModelController.getCities);
routes.get("/get-restaurant/:id", sModelController.getRestaurantById);
routes.get("/get-states", sModelController.getStates);

routes.post("/add-user", sModelController.addUser);
routes.post("/add-restaurant", sModelController.addRestaurant);
// routes.put(`/edit-restaurant/${id}`, sModelController.postData);
routes.post("/login", sModelController.loginUser)
routes.post("/add-cities", sModelController.addCities)
routes.post("/add-states", sModelController.addStates)

routes.put("/update-restaurant/:id", sModelController.updateRestaurant);




export default routes;