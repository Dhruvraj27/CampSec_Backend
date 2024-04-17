const express = require("express");
const {
  signUpController,
  signInController,
} = require("../Controller/userController");
const routes = express.Router();

routes.post("/api/v1/register", signUpController);
routes.post("/api/v1/signIn", signInController);

module.exports = routes;
