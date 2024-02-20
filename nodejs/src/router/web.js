const express = require("express");
let router = express.Router();
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const orderController = require("../controller/orderController");
const categoriesController = require("../controller/categoryController");

let initWebRoutes = (app) => {
    // Categories Section
    router.get("/api/getAllRoots", categoriesController.handleGetAllRoots);
    router.get("/api/getAllCategories",categoriesController.handleGetAllCatalogs);
    router.post("/api/create-new-root",categoriesController.handleCreateNewRoot);
    router.post("/api/create-new-category",categoriesController.handleCreateNewCatalog);
    router.put("/api/editroot", categoriesController.handleEditRoot);
    router.put("/api/editcategory", categoriesController.handleEditCatalog);
    router.delete("/api/deleteroot", categoriesController.handleDeleteRoot);

    // User Section
    router.post("/api/regist", userController.handleRegist);
    router.post("/api/login", userController.handleLogin);
    router.post("/api/logout", userController.handleLogout);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.get("/api/getuser", userController.handleGetUser);
    // router.put("/api/edituser", userController.handleEditUser);
    // router.delete("/api/deleteuser", userController.handleDeleteUser);

    // Product Section
    router.get("/api/get-all-products", productController.handleGetAllProducts);

    // Cart Section
    router.get("/api/getAllCart", orderController.getAllCart);
    router.get("/list", userController.listModels);
    return app.use("/", router);
};

module.exports = initWebRoutes;
