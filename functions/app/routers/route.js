let express = require("express");
let api = express.Router();

let userRoutes = require('./router/user');
// let authRoutes = require('./router/auth');

api.use("/user", userRoutes);


module.exports = api;