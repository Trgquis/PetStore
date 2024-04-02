const db = require("../model/server");
const { Op, where } = require("sequelize");
const fs = require("fs");
const path = require("path");
const unidecode = require("unidecode");

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
                console.log(data);
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
                        if (images && images.length > 0) {
                            for (const file of images) {
                                const imageRecord = await db.Image.create({
                                    product_id: product.id,
                                    cloudinary_public_id: file.path
                                        .split("images/")[1]
                                        .split(".")[0],
                                    secure_url: file.path,
                                });
                                imageRecords.push(imageRecord);
                            }
                        }
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
                    product = await db.Product.findOne({
                        where: { id: productId },
                        unique: true,
                        raw: true,
                        nest: true,
                    });
                    images = await db.Image.findAll({
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
                images = await db.Image.findAll({
                    where: {
                        product_id: {
                            [Op.not]: null,
                        },
                    },
                });
                let count = await db.Product.count();
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
                const productId = data.id;
                const exist = await db.Product.findOne({
                    where: {
                        id: productId,
                    },
                });

                if (!exist) {
                    resolve({
                        errCode: 2,
                        errMessage: "Product not found",
                    });
                } else {
                    const newdata = await db.Product.update(
                        {
                            category_id: parseInt(data.category_id),
                            name: data.name,
                            price: parseFloat(data.price),
                            discount: parseFloat(data.discount),
                            content: data.content,
                            amount: data.amount,
                        },
                        {
                            where: {
                                id: data.id,
                            },
                            returning: true,
                        }
                    );
                    resolve({
                        errCode: 0,
                        errMessage: "product is updated",
                        newdata: newdata[1][0],
                    });
                }
            } catch (e) {
                console.error("Error updating product:", error);
                reject(e);
            }
        });
    },

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
            let keywordWithoutDiacritics = unidecode(keyword);
            return new Promise(async (resolve, reject) => {
                let result = {};

                let data = await db.Product.findAll({
                    where: {
                        [Op.or]: [
                            {
                                [Op.and]: db.Sequelize.literal(
                                    `unaccent("Product"."name") ILIKE unaccent('%${keyword}%')`
                                ),
                            },
                            {
                                [Op.and]: db.Sequelize.literal(
                                    `"Product"."name" ILIKE '%${keyword}%'`
                                ),
                            },
                        ],
                    },
                });
                result.products = data;
                let count = await db.Product.findAll({
                    where: {
                        [Op.or]: [
                            {
                                [Op.and]: db.Sequelize.literal(
                                    `unaccent("Product"."name") ILIKE unaccent('%${keyword}%')`
                                ),
                            },
                            {
                                [Op.and]: db.Sequelize.literal(
                                    `"Product"."name" ILIKE '%${keyword}%'`
                                ),
                            },
                        ],
                    },
                });
                result.count = count.length;
                let images = await db.Image.findAll({
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

    addProductImage: async (productId, newImage) => {
        try {
            // Thêm ảnh mới dựa trên newImage
            const createdImage = await db.Image.create({
                type: newImage.mimetype,
                image_name: newImage.filename,
                path: newImage.path,
                product_id: productId,
            });
            return {
                errCode: 0,
                errMessage: "Image added successfully",
                newImage: createdImage,
            };
        } catch (error) {
            console.error("Error adding product image:", error);
            throw error;
        }
    },

    deleteProductImage: async (imageId) => {
        try {
            // Xóa ảnh dựa trên imageId
            await db.Image.destroy({ where: { id: imageId } });
            return { errCode: 0, errMessage: "Image deleted successfully" };
        } catch (error) {
            console.error("Error deleting product image:", error);
            throw error;
        }
    },
};

module.exports = productService;
