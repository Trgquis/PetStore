const { Op, where } = require("sequelize");
const orderController = require("../controller/orderController");
const db = require("../model/server");
const orderService = {
    handleSubmitOrder: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(data);
                // Tạo đơn hàng mới
                if (data.guestuserId) {
                    const order = await db.Order.create({
                        user_id: 1,
                        guestuser_id: data.guestuserId,
                        status: "Pending",
                    });
                    const OrderValue = order.dataValues;
                    // console.log(OrderValue);
                    console.log(
                        `Khách hàng: ${data.guestuserId} đã đặt sản phẩm `
                    );
                    // Tạo bản ghi mới cho các sản phẩm
                    const orderItemList = [];
                    for (const productOrder of data.cart) {
                        const orderItem = await db.Detail.create({
                            product_id: parseInt(productOrder.productId),
                            order_id: parseInt(order.id),
                            quantity: parseInt(productOrder.quantity),
                            total_price: productOrder.price,
                            status: "pending",
                        });
                        orderItemList.push(orderItem.dataValues);
                    }
                    // console.log(orderItemList);
                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        isGuest: true,
                        orderItemList,
                        OrderValue,
                    });
                } else {
                    const order = await db.Order.create({
                        user_id: parseInt(data.userId),
                        guestuser_id: null,
                        status: "Pending",
                    });
                    const OrderValue = order.dataValues;
                    console.log(`Khách hàng: ${data.userId} đã đặt sản phẩm `);
                    // Tạo bản ghi mới cho các sản phẩm
                    const orderItemList = [];
                    for (const productOrder of data.cart) {
                        const orderItem = await db.Detail.create({
                            product_id: parseInt(productOrder.productId),
                            order_id: parseInt(order.id),
                            quantity: parseInt(productOrder.quantity),
                            total_price: productOrder.price,
                            status: "pending",
                        });
                        orderItemList.push(orderItem.dataValues);
                        
                    }
                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        isGuest: false,
                        orderItemList,
                        OrderValue,
                    });
                }
            } catch (e) {
                console.log(e);
                return false;
            }
        });
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
};

module.exports = orderService;
