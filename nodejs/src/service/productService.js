const db = require("../model/server");
const { Op, where, Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const unidecode = require("unidecode");
const product = require("../model/product");

const productService = {
    sendReview: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let review = await db.Review.create({
                    user_id: data.userId,
                    product_id: data.productId,
                    score: data.rating,
                    comment: data.comment,
                });
                console.log(review);
                if (review) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                reject(e);
            }
        });
    },

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
                        sold_amount: data.sold_amount,
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
                let reviewsData = null;
                let reviewsCount = 0;
                let averageRating = 0;

                if (productId) {
                    // Lấy thông tin sản phẩm từ bảng products
                    product = await db.Product.findOne({
                        where: { id: productId },
                        raw: true,
                        nest: true,
                    });
                    // Lấy tất cả hình ảnh của sản phẩm từ bảng images
                    images = await db.Image.findAll({
                        where: { product_id: productId },
                    });

                    reviewsData = await db.Review.findAll({
                        attributes: {
                            raw: true,
                        },
                        where: { product_id: productId },
                        order: [["createdAt", "DESC"]],
                    });

                    // Lấy số lượng đánh giá của sản phẩm từ bảng reviews
                    reviews = await db.Review.findAll({
                        attributes: [
                            [
                                Sequelize.fn("COUNT", Sequelize.col("id")),
                                "reviewCount",
                            ],
                            [
                                Sequelize.fn("AVG", Sequelize.col("score")),
                                "avgScore",
                            ],
                        ],
                        // attributes: {
                        //     raw: true,
                        // },
                        where: { product_id: productId },
                    });
                    // Lấy số lượng đánh giá và điểm trung bình từ kết quả
                    if (reviews.length > 0) {
                        reviewsCount = parseInt(reviews[0].reviewCount);
                        averageRating = Math.round(
                            parseFloat(reviews[0].avgScore || 0)
                        );
                    }
                }

                let result = {
                    product,
                    images,
                    reviewsData,
                    reviewsCount,
                    averageRating,
                };
                console.log(result);
                resolve(result);
            } catch (e) {
                console.log(e);
                // reject(e);
            }
        });
    },

    getAllReviews: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const reviews = await db.Review.findAll();
                console.log(reviews);
                resolve(reviews);
            } catch (error) {
                throw error;
            }
        });
    },

    avgRating: async (productId) => {
        try {
            const reviews = await db.Review.findAll({
                attributes: [
                    [Sequelize.fn("AVG", Sequelize.col("score")), "avgScore"],
                ],
                where: { product_id: productId },
            });

            // Lấy giá trị trung bình đánh giá từ reviews, hoặc trả về 0 nếu không có đánh giá nào
            const averageRating = reviews.length > 0 ? reviews[0].avgScore : 0;

            return averageRating;
        } catch (error) {
            throw error;
        }
    },

    getAllProducts: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const reviewsCount = await db.Review.findAll({
                    attributes: [
                        "product_id",
                        [
                            Sequelize.fn("COUNT", Sequelize.col("id")),
                            "reviewCount",
                        ],
                    ],
                    group: ["product_id"],
                });

                // Lấy trung bình đánh giá từ bảng reviews
                const averageRatings = await db.Review.findAll({
                    attributes: [
                        "product_id",
                        [
                            Sequelize.fn("AVG", Sequelize.col("score")),
                            "avgScore",
                        ],
                    ],
                    group: ["product_id"],
                });

                // Chuyển danh sách số lượng đánh giá và trung bình đánh giá thành các bản đồ
                const reviewCountMap = {};
                reviewsCount.forEach((review) => {
                    reviewCountMap[review.product_id] = review.reviewCount;
                });

                const avgRatingMap = {};
                averageRatings.forEach((review) => {
                    avgRatingMap[review.product_id] = review.avgScore || 0;
                });

                let products = "";
                products = await db.Product.findAll({
                    attributes: {
                        raw: true,
                    },
                    order: [["discount", "DESC"]], // Sắp xếp theo discount giảm dần
                });

                products.forEach((product) => {
                    const reviewCount = reviewCountMap[product.id] || 0; // Nếu không có đánh giá nào, đặt số lượng là 0
                    const averageRating = avgRatingMap[product.id] || 0; // Nếu không có trung bình đánh giá, đặt là 0
                    // Làm tròn trung bình đánh giá thành số nguyên
                    product.avgRating = parseFloat(averageRating.toFixed(1));
                    product.reviewCount = parseInt(reviewCount);
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
                // console.log(products);
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
