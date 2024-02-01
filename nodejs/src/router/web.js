const express = require("express");
let router = express.Router();
const userController = require("../controller/userController");
const productController = require("../controller/productController");

let initWebRoutes = (app) => {
    // User Section
    router.post("/api/regist", userController.handleRegist);
    router.post("/api/login", userController.handleLogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);

    // Product Section
    router.get("/api/get-all-products", productController.handleGetAllProducts);

    router.get("/list", userController.listModels);
    return app.use("/", router);
};

module.exports = initWebRoutes;
