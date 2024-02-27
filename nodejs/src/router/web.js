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
    router.post(
        "/api/create-new-root",
        categoriesController.handleCreateNewRoot
    );
    router.post(
        "/api/create-new-category",
        categoriesController.handleCreateNewCatalog
    );
    router.put("/api/editroot", categoriesController.handleEditRoot);
    router.put("/api/editcategory", categoriesController.handleEditCatalog);
    router.delete("/api/deleteroot", categoriesController.handleDeleteRoot);

    router.put("/test", async (req, res) => {
        const updatedCategories = req.body;
        console.log(updatedCategories);
        try {
            // Duyệt qua danh sách các danh mục và cập nhật priority
            for (const updatedCategory of updatedCategories) {
                await db.Categories.update(
                    {
                        priority: parseInt(updatedCategory.destination.index),
                    },
                    {
                        where: {
                            id: parseInt(updatedCategory.draggableId),
                        },
                    }
                );
            }
            const categories = await db.Categories.findAll({
                order: [["priority", "ASC"]], // Sắp xếp theo priority tăng dần
            });

            res.json({
                errCode: 0,
                errMessage: "Sucess",
                categories,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    router.put("/testnew", async (req, res) => {
        const movedCategoryId = req.body.movedId;
        const destinationIndex = req.body.destinationIndex;
        const sourceId = req.body.sourceIndex;
        console.log(movedCategoryId, destinationIndex, sourceId);
        try {
            // Lấy thông tin của phần tử được kéo
            const movedCategory = await db.Categories.findOne({
                where: {
                    id: parseInt(movedCategoryId),
                },
            });

            // Lấy thông tin của phần tử ở vị trí đích
            const destinationCategory = await db.Categories.findOne({
                where: {
                    priority: parseInt(destinationIndex),
                },
            });

            // Cập nhật priority của phần tử được kéo
            await db.Categories.update(
                { priority: parseInt(destinationIndex) },
                { where: { id: parseInt(movedCategoryId) } }
            );

            // Cập nhật priority của phần tử ở vị trí đích
            await db.Categories.update(
                { priority: parseInt(movedCategory.priority) },
                { where: { id: parseInt(destinationCategory.id) } }
            );

            // Lấy danh sách danh mục đã cập nhật để gửi về frontend
            const categories = await db.Categories.findAll({
                order: [["priority", "ASC"]],
            });
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    // User Section
    router.post("/api/regist", userController.handleRegist);
    router.post("/api/login", userController.handleLogin);
    router.post("/api/logout", userController.handleLogout);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.get("/api/getuser", userController.handleGetUser);
    // router.put("/api/edituser", userController.handleEditUser);
    // router.delete("/api/deleteuser", userController.handleDeleteUser);

    // Product Section
    router.get("/api/getAllProducts", productController.handleGetAllProducts);
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
