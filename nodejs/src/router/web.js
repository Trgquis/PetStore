const express = require("express");
let router = express.Router();
const userController = require("../controller/userController");
const productController = require("../controller/productController");
const orderController = require("../controller/orderController");
const categoriesController = require("../controller/categoryController");
const uploadmiddleware = require("../middleware/uploadmiddleware");
const db = require("../model/server");
let initWebRoutes = (app) => {
    app.use("/images", express.static("./images"));

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
    router.post("/api/logout", userController.handleLogout);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.get("/api/getuser", userController.handleGetUser);
    router.put("/api/edituser", userController.handleUpdateUser);
    router.delete("/api/deleteuser", userController.handleDeleteUser);

    // Product Section
    router.get("/api/search", productController.handleSearchProduct)
    router.get("/api/getAllProducts", productController.handleGetAllProducts);
    router.get("/api/getProduct", productController.handleGetProduct);
    router.post(
        "/api/create-new-product",
        uploadmiddleware.upload,
        productController.handleCreateNewProduct
    );
    router.post("/api/editproduct", productController.handleEditProduct),
        router.post(
            "/api/addproductimage",
            productController.handleAddProductImage
        );
    router.delete("/api/deleteProduct", productController.handleDeleteProduct),
        // Cart Section
        router.get("/api/getAllCart", orderController.getAllCart);
    router.get("/list", userController.listModels);
    return app.use("/", router);
};

module.exports = initWebRoutes;
