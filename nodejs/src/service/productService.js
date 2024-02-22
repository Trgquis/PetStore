const db = require("../model/server");
const { Op, where } = require("sequelize");
const fs = require("fs");
const path = require("path");

const productService = {
    checkProduct: (productInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                let product = await db.Product.findOne({
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
                let inspect = await productService.checkProduct(data.name);
                if (inspect === true) {
                    resolve({
                        errCode: 1,
                        errMessage: "Product already exists!",
                    });
                } else {
                    const product = await db.Product.create({
                        category_id: parseInt(data.category_id),
                        name: data.name,
                        price: parseFloat(data.price),
                        discount: parseFloat(data.discount),
                        content: data.content,
                        amount: parseInt(data.amount),
                    });
                    console.log(product);
                    const imageRecords = [];
                    try {
                        const imageRecord = await db.Image.bulkCreate(
                            images.map((image) => ({
                                type: image.mimetype,
                                image_name: image.filename,
                                path: image.path,
                                product_id: product.id,
                            }))
                        );
                        imageRecords.push(imageRecord);
                    } catch (imageError) {
                        console.error("Error during image upload:", imageError);
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
        }).catch((error) => {
            console.error("Error during product creation:", error);
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
                products = await db.Product.findAll({
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
                let count = await db.Product.count();
                console.log(products);
                let result = { products, images, count };

                resolve({
                    errCode: 0,
                    errMessage: "oke",
                });
            } catch (e) {
                reject(e);
            }
        });
    },

    // updateProduct: (data, images) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             if (!data.id) {
    //                 resolve({
    //                     errCode: 2,
    //                     errMessage: "Missing parameters",
    //                 });
    //             }
                
    //             const newdata = await db.Product.update(
    //                 {
    //                     category_id: data.category_id,
    //                     name: data.name,
    //                     price: data.price,
    //                     discount: data.discount,
    //                     content: data.content,
    //                     amount: data.amount
    //                 },
    //                 {
    //                     where: {
    //                         id: data.id,
    //                     },
    //                 }
    //             )
    //             console.log(newdata)
    //             let images_update = await db.Images.update({
                    
    //             },
    //             where: {
    //                 product_id: data.id
    //             });
    //             console.log(images.length);
    //             if (product && images.length === 4) {
    //                 product.catalog_id = data.catalog_id;
    //                 product.name = data.name;
    //                 product.quantity = data.quantity;
    //                 product.price = data.price;
    //                 product.content = data.content;
    //                 await product.save();

    //                 for (let i = 0; i < images.length; i++) {
    //                     const image = images[i];
    //                     const imageToUpdate = images_update[i];
    //                     if (imageToUpdate) {
    //                         imageToUpdate.type = image.mimetype;
    //                         imageToUpdate.image_name = image.filename;
    //                         imageToUpdate.path = image.path;
    //                         await imageToUpdate.save();
    //                     } else {
    //                         const newImage = await db.Images.create({
    //                             product_id: product.id,
    //                             type: image.mimetype,
    //                             image_name: image.filename,
    //                             path: image.path,
    //                         });
    //                         images_update.push(newImage);
    //                     }
    //                 }
    //                 resolve({
    //                     errCode: 0,
    //                     errMessage: "Update Product Succeed!",
    //                 });
    //             } else {
    //                 resolve({
    //                     errCode: 1,
    //                     errMessage:
    //                         "Product not found or amount of images should be 4",
    //                 });
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     });
    // },

    deleteProduct: async (productId) => {
        try {
            return new Promise(async (resolve, reject) => {
                let product = await db.Product.findOne({
                    where: { id: productId },
                });
                if (!product) {
                    resolve({
                        errCode: 2,
                        errMessage: "Product is not exist",
                    });
                } else if (product) {
                    const images = await db.Image.findAll({
                        where: { product_id: productId },
                    });
                    if (images.length === 0) {
                        resolve({
                            errCode: 2,
                            errMessage: "Images is not exist",
                        });
                    } else {
                        await db.Image.destroy({
                            where: { product_id: productId },
                        });
                        images.forEach((image) => {
                            const imagePath = path.join(
                                __dirname,
                                "../../",
                                image.path
                            );
                            console.log(image.path);
                            // fs.unlinkSync(imagePath);
                            try {
                                fs.unlinkSync(imagePath);
                                console.log(
                                    `Image ${image.path} deleted successfully`
                                );
                            } catch (error) {
                                console.error(
                                    `Error deleting image ${image.path}:`,
                                    error
                                );
                                // Handle the error as needed, for example, you might want to reject the promise
                                reject(error);
                            }
                        });
                        try {
                            await db.Product.destroy({
                                where: { id: productId },
                            });
                            await db.Image.destroy({
                                where: { product_id: productId },
                            });
                        } catch (e) {
                            console.log(e);
                            reject(e);
                        }
                    }
                }
                resolve({
                    errCode: 0,
                    errMessage: "Product is deleted",
                });
            });
        } catch (error) {
            console.log(error);
            reject(error);
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
