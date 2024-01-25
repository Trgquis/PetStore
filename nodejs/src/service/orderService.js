import db from "../models/index";
const { Op, where } = require("sequelize");

const orderService = {
    handleSubmitOrder: async (data) => {
        try {
            // Tạo đơn hàng mới
            const order = await db.Orders.create({
                user_id: parseInt(data.user_id),
                status: data.status,
            });
            console.log("data", data);

            // Lấy danh sách sản phẩm trong giỏ hàng hoặc sản phẩm cần đặt
            let productOrders = [];
            if (data.status === "isCart") {
                productOrders = await db.ProductOrders.findAll({
                    where: {
                        order_id: order.id,
                        isCart: 1,
                    },
                });
            } else if (data.status === "buyNow") {
                // Nếu không ở trong giỏ hàng, lấy sản phẩm cần đặt
                productOrders.push({
                    product_id: parseInt(data.product_id),
                    quantity: parseInt(data.quantity),
                    total_price: parseFloat(data.total_price),
                    isCart: 0,
                });
            }

            // Tạo bản ghi mới cho các sản phẩm
            for (const productOrder of productOrders) {
                await db.ProductOrders.create({
                    product_id: productOrder.product_id,
                    order_id: order.id,
                    quantity: productOrder.quantity,
                    total_price: productOrder.total_price,
                    isCart: productOrder.isCart,
                    status: productOrder.isCart ? "pending" : "processing",
                });
            }

            // Nếu đang ở trạng thái giỏ hàng, xóa các sản phẩm đã được đặt hàng khỏi giỏ hàng
            if (data.status === "isCart") {
                await db.ProductOrders.destroy({
                    where: {
                        order_id: order.id,
                        isCart: 1,
                    },
                });
            }

            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    getOrder: async (id) => {
        try {
            const order = await db.Orders.findOne({
                where: {
                    user_id: id,
                    status: "buyNow",
                },
                order: [["createdAt", "DESC"]],
            });
            console.log(order);
            if (order) {
                const cartItem = await db.ProductOrders.findOne({
                    where: {
                        order_id: order.id,
                        isCart: 0,
                    },
                    raw: false,
                });
                console.log(cartItem);
                const product = await db.Products.findOne({
                    where: { id: cartItem.product_id },
                });
                const images = await db.Images.findOne({
                    where: { product_id: product.id },
                });
                return {
                    ...cartItem.toJSON(),
                    product,
                    images,
                };
            }
        } catch (e) {
            console.log(e);
        }
    },
    getAllCart: async (id) => {
        console.log(id);
        try {
            console.log(id);
            const order = await db.Orders.findOne({
                where: {
                    user_id: id,
                    status: "isCart",
                },
                order: [["createdAt", "DESC"]],
            });
            if (order) {
                // Lấy tất cả các sản phẩm trong giỏ hàng của đơn hàng đó
                const cartItems = await db.ProductOrders.findAll({
                    where: {
                        order_id: order.id,
                        isCart: 1,
                    },
                    raw: false,
                });
                console.log(cartItems);

                // Lấy thông tin sản phẩm tương ứng với mỗi item trong giỏ hàng
                const cartItemsWithProductInfo = await Promise.all(
                    cartItems.map(async (cartItem) => {
                        const product = await db.Products.findOne({
                            where: { id: cartItem.product_id },
                        });
                        const images = await db.Images.findOne({
                            where: { product_id: product.id },
                        });
                        return {
                            ...cartItem.toJSON(),
                            product,
                            images,
                        };
                    })
                );
                const cartItemCount = cartItemsWithProductInfo.length;

                return {
                    count: cartItemCount,
                    cartItem: cartItemsWithProductInfo,
                };
            }
            resolve("Error");
        } catch (e) {
            console.log(e);
        }
    },
    handleAddCart: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const inspect = await db.Orders.findOne({
                    where: {
                        user_id: data.user_id,
                        status: "isCart",
                    },
                });

                if (inspect) {
                    const productOrder = await db.ProductOrders.findOne({
                        where: {
                            order_id: inspect.id,
                            product_id: data.product_id,
                            isCart: 1,
                        },
                    });

                    if (productOrder) {
                        // Sản phẩm đã tồn tại trong giỏ hàng, ta sẽ tăng số lượng sản phẩm
                        productOrder.quantity =
                            parseInt(productOrder.quantity) +
                            parseInt(data.quantity);
                        productOrder.total_price =
                            parseFloat(productOrder.total_price) +
                            parseFloat(data.total_price);

                        await db.ProductOrders.update(productOrder, {
                            where: { id: productOrder.id },
                        });
                    } else {
                        // Sản phẩm chưa tồn tại trong giỏ hàng, ta sẽ tạo một bản ghi mới
                        await db.ProductOrders.create({
                            product_id: data.product_id,
                            order_id: inspect.id,
                            quantity: data.quantity,
                            total_price: data.total_price,
                            isCart: 1,
                            status: "pending",
                        });
                    }
                } else {
                    // Tạo đơn hàng mới và bản ghi sản phẩm
                    const order = await db.Orders.create({
                        user_id: data.user_id,
                        status: "isCart",
                    });

                    await db.ProductOrders.create({
                        product_id: data.product_id,
                        order_id: order.id,
                        quantity: data.quantity,
                        total_price: data.total_price,
                        isCart: 1,
                        status: "pending",
                    });
                }

                resolve("oke");
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
};

module.exports = orderService;
