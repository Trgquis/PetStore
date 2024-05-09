const productService = require("../service/productService.js");

const productController = {
    handleSendReview: async (req, res) => {
        try {
            let data = {
                userId: parseInt(req.body.userId),
                productId: parseInt(req.body.productId),
                rating: parseFloat(req.body.rating),
                comment: req.body.comment,
            };
            let message = await productService.sendReview(data);
            return res.status(200).json(message);
        } catch (e) {
            console.log(e);
        }
    },

    handleCreateNewProduct: async (req, res) => {
        try {
            console.log(req.body);
            // console.log(req.files)
            let images = req.files;
            // let productId = req.params.id
            let data = {
                category_id: parseInt(req.body.category_id),
                name: req.body.name,
                price: req.body.price,
                discount: req.body.discount,
                content: req.body.content,
                amount: req.body.amount,
                sold_amount: 0,
            };
            let message = await productService.createNewProduct(data, images);
            return res.status(200).json(message);
        } catch (e) {
            console.log(e);
        }
    },

    handleEditProduct: async (req, res) => {
        console.log(req.body);
        let data = {
            id: req.body.id,
            catalog_id: req.body.catalog_id,
            name: req.body.name,
            price: req.body.price,
            content: req.body.content,
            discount: req.body.discount,
        };
        console.log(data);
        let message = await productService.updateProduct(data);
        return res.status(200).json(message);
    },

    handleGetAllProducts: async (req, res) => {
        let products = await productService.getAllProducts();
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            products,
        });
    },

    handleGetAllPopular: async (req, res) => {
        let products = await productService.getAllPopular();
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            products,
        });
    },

    handleGetAllTopSale: async (req, res) => {
        let products = await productService.getAllTopSale();
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            products,
        });
    },

    handleGetAllReviews: async (req, res) => {
        let reviews = await productService.getAllReviews();
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            reviews,
        });
    },

    handleGetProduct: async (req, res) => {
        let id = await req.query.id;
        console.log(id);
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
                products: {},
            });
        }

        let product = await productService.getProductById(id);
        console.log(product);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            product,
        });
    },

    handleDeleteProduct: async (req, res) => {
        const id = req.query.id;
        console.log(id);
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing Parameters",
            });
        }
        console.log(req.body.id);
        let message = await productService.deleteProduct(id);
        console.log(message);
        return res.status(200).json(message);
    },

    handleSearchProduct: async (req, res) => {
        let keyword = req.query.name;
        console.log(keyword);
        if (!keyword) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing keyword",
            });
        }
        let message = await productService.searchProduct(keyword);
        return res.status(200).json(message);
    },

    handleAddProductImage: async (req, res) => {},
};

module.exports = productController;
