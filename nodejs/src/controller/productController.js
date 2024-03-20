const productService = require("../service/productService.js");

const productController = {
    handleCreateNewProduct: async (req, res) => {
        // console.log(req.body)
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
        };
        let message = await productService.createNewProduct(data, images);
        return res.status(200).json(message);
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
        console.log(products);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            products,
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
        // console.log(req.body.id)
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
