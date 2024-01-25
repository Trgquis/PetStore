const db = require("../models/index");
const { Op, where } = require("sequelize");
const fs = require("fs");
const path = require("path");

const productService = {
    checkProduct: (productInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await db.Products.findOne({
                    where: { name: productInfo },
                });
                if (product) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                reject(e);
            }
        });
    },

    createNewProduct: async (data, images) => {
        return new Promise(async (resolve, reject) => {
            try {
                // check ten danh muc da ton tai trong db chua
                let inspect = await checkProduct(data.name);
                console.log(inspect);
                if (inspect === true) {
                    resolve({
                        errCode: 1,
                        errMessage: "Product is existed!",
                    });
                } else {
                    const product = await db.Products.create({
                        catalog_id: data.catalog_id,
                        name: data.name,
                        quantity: data.quantity,
                        price: data.price,
                        discount: data.discount,
                        content: data.content,
                    });
                    const imageRecords = [];
                    for (let i = 0; i < images.length; i++) {
                        const image = images[i];
                        console.log(image);
                        const imageRecord = await db.Images.create({
                            type: image.mimetype,
                            image_name: image.filename,
                            path: image.path,
                            product_id: product.id,
                            user_id: null,
                        });
                        imageRecords.push(imageRecord);
                    }

                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        product,
                        imageRecords,
                    });
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    getProductById: async (productId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let product = null;
                let images = null;

                if (productId) {
                    product = await db.Products.findOne({
                        where: { id: productId },
                        unique: true,
                        raw: true,
                        nest: true,
                    });
                    images = await db.Images.findAll({
                        where: { product_id: productId },
                    });
                }

                let result = { product, images };
                console.log(result);
                resolve(result);
            } catch (e) {
                console.log(e);
                // reject(e);
            }
        });
    },

    getAllProducts: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let products = "";
                products = await db.Products.findAll({
                    attributes: {
                        raw: true,
                    },
                });
                let images = "";
                images = await db.Images.findAll({
                    where: {
                        product_id: {
                            [Op.not]: null,
                        },
                    },
                });
                let count = await db.Products.count();
                console.log(products);
                let result = { products, images, count };

                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    },

    updateProduct: (data, images) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.id) {
                    resolve({
                        errCode: 2,
                        errMessage: "Missing parameters",
                    });
                }

                let product = await db.Products.findOne({
                    where: { id: data.id },
                    raw: false,
                });
                let images_update = await db.Images.findAll({
                    where: { product_id: data.id },
                    raw: false,
                });
                console.log(images.length);
                if (product && images.length === 4) {
                    product.catalog_id = data.catalog_id;
                    product.name = data.name;
                    product.quantity = data.quantity;
                    product.price = data.price;
                    product.content = data.content;
                    await product.save();

                    for (let i = 0; i < images.length; i++) {
                        const image = images[i];
                        const imageToUpdate = images_update[i];
                        if (imageToUpdate) {
                            imageToUpdate.type = image.mimetype;
                            imageToUpdate.image_name = image.filename;
                            imageToUpdate.path = image.path;
                            await imageToUpdate.save();
                        } else {
                            const newImage = await db.Images.create({
                                product_id: product.id,
                                type: image.mimetype,
                                image_name: image.filename,
                                path: image.path,
                            });
                            images_update.push(newImage);
                        }
                    }
                    resolve({
                        errCode: 0,
                        errMessage: "Update Product Succeed!",
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage:
                            "Product not found or amount of images should be 4",
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
    },

    deleteProduct: async (productId) => {
        try {
            return new Promise(async (resolve, reject) => {
                let product = await db.Products.findOne({
                    where: { id: productId },
                });

                if (!product) {
                    resolve({
                        errCode: 2,
                        errMessage: "Product is not exist",
                    });
                } else if (product) {
                    const images = await db.Images.findAll({
                        where: { product_id: productId, user_id: null },
                    });
                    images.forEach((image) => {
                        const imagePath = path.join(
                            __dirname,
                            "../../",
                            image.path
                        );
                        console.log(image.path);
                        fs.unlinkSync(imagePath);
                    });

                    await db.Products.destroy({
                        where: { id: productId },
                    });
                    await db.Images.destroy({
                        where: { product_id: productId },
                    });
                }
                resolve({
                    errCode: 0,
                    errMessage: "Product is deleted",
                });
            });
        } catch (error) {
            console.log(error);
        }
    },

    searchProduct: async (keyword) => {
        try {
            return new Promise(async (resolve, reject) => {
                let result = {};

                let data = await db.Products.findAll({
                    where: {
                        name: {
                            [Op.or]: {
                                [Op.regexp]: keyword,
                                [Op.substring]: keyword,
                            },
                        },
                    },
                });
                result.products = data;
                let count = await db.Products.findAll({
                    where: {
                        name: {
                            [Op.or]: {
                                [Op.regexp]: keyword,
                                [Op.substring]: keyword,
                            },
                        },
                    },
                });
                result.count = count.length;
                let images = await db.Images.findAll({
                    where: {
                        product_id: data.map((product) => product.id),
                    },
                });
                result.images = images;

                if (!data) {
                    resolve({
                        errCode: 2,
                        errMessage: "Product is not exist",
                    });
                }
                result.images = images;

                resolve(result);
            });
        } catch (e) {
            console.log(e);
        }
    },
};

module.exports = productService;
