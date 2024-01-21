const express = require("express");
let router = express.Router();
const userController = require("../controller/userController");

let initWebRoutes = (app) => {
    // User Section

    
    router.post("/api/regist", userController.handleRegist);
    router.post("/api/login", userController.handleLogin);

    router.get("/list", userController.listModels);
    return app.use("/", router);
};

module.exports = initWebRoutes;
