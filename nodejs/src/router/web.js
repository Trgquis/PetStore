const express = require("express");
let router = express.Router();

const userController = require("../controller/userController");
const productController = require("../controller/productController");
const orderController = require("../controller/orderController");
const categoriesController = require("../controller/categoryController");
const uploadmiddleware = require("../middleware/uploadmiddleware");
const db = require("../model/server");
const fs = require("fs");
const csvParser = require("csv-parser");
const { PythonShell } = require("python-shell");
const modelFilePath = "src/recommendSystem/recommendation_model.pkl";
const fileUploader = require("../config/cloudinary.config");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
let initWebRoutes = (app) => {
    app.use("/images", express.static("./images"));
    app.get("/", (req, res) => {
        res.send("Welcome to PetStore");
    });
    // Categories Section
    router.get("/api/getAllRoots", categoriesController.handleGetAllRoots);
    router.get(
        "/api/getAllCategories",
        categoriesController.handleGetAllCatalogs
    );
    router.get("/api/getAllChilds", categoriesController.handleGetAllChilds);
    router.get("/api/getCategory", categoriesController.handleGetCatalog);
    router.get("/api/getChild", categoriesController.handleGetChild);

    router.post(
        "/api/create-new-root",
        categoriesController.handleCreateNewRoot
    );
    router.post(
        "/api/create-new-category",
        categoriesController.handleCreateNewCatalog
    );
    router.post(
        "/api/create-new-child",
        categoriesController.handleCreateNewChild
    );
    router.put("/api/editroot", categoriesController.handleEditRoot);
    router.put("/api/editcategory", categoriesController.handleEditCatalog);
    router.put("/api/editchild", categoriesController.handleEditChild);
    router.delete("/api/deleteroot", categoriesController.handleDeleteRoot);
    router.delete(
        "/api/deletecategory",
        categoriesController.handleDeleteCatalog
    );
    router.delete("/api/deletechild", categoriesController.handleDeleteChild);

    router.put("/api/drag", categoriesController.handleDrag);
    router.put("/api/dragroot", categoriesController.handleDragRoot);
    router.put("/api/dragchild", categoriesController.handleDragChild);

    // User Section
    router.post("/api/regist", userController.handleRegist);
    router.post("/api/login", userController.handleLogin);
    router.put("/api/logout", userController.handleLogout);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.get("/api/getuser", userController.handleGetUser);
    router.put("/api/edituser", userController.handleUpdateUser);
    router.delete("/api/deleteuser", userController.handleDeleteUser);

    // Product Section
    router.get("/api/search", productController.handleSearchProduct);
    router.get("/api/getAllProducts", productController.handleGetAllProducts);
    router.get("/api/getAllPopular", productController.handleGetAllPopular);

    router.get("/api/getAllReviews", productController.handleGetAllReviews);
    router.get("/api/getProduct", productController.handleGetProduct);
    router.post(
        "/api/create-new-product",
        uploadmiddleware.upload,
        productController.handleCreateNewProduct
    );
    router.put("/api/editproduct", productController.handleEditProduct),
        router.post(
            "/api/addproductimage",
            productController.handleAddProductImage
        );
    router.delete("/api/deleteProduct", productController.handleDeleteProduct),
        router.post(
            "/api/handleSendReview",
            productController.handleSendReview
        );
    // Cart Section
    router.get("/api/getAllCart", orderController.getAllCart);
    router.post("/api/addcart", orderController.handleAddCart);
    router.delete("/api/removeItemCart", orderController.handleRemoveCart);
    router.delete("/api/deleteCart/", orderController.deleteCartItem);
    router.get("/clear", (req, res) => {
        try {
            res.clearCookie("cartData");
            res.status(200).json({
                success: true,
                message: "Cookies cleared successfully.",
            });
        } catch (error) {
            console.error("Error clearing", error);
            res.status(500).json({ message: "Internal Server Error." });
        }
    });
    //Order Section
    router.post("/api/submitOrder", orderController.handleSubmitOrder);
    router.get("/api/handleGetAllOrders", orderController.handleGetAllOrders);
    router.get("/api/handleGetUserOrders", orderController.handleGetUserOrders);
    router.get("/list", userController.listModels);
    router.put("/api/editStatus", orderController.handleEditStatus);
    return app.use("/", router);
};

module.exports = initWebRoutes;
