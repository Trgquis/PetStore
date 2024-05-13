const { Op, where } = require("sequelize");
const orderController = require("../controller/orderController");
const db = require("../model/server");
const { raw } = require("body-parser");
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
                        city: data.city,
                        district: data.district,
                        ward: data.ward,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        delivery: data.deliveryMethod,
                        payment: data.paymentMethod,
                        totalPayment: data.totalPrice,
                        shipFee: data.deliveryPrice,
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

                    for (const productOrder of data.cart) {
                        try {
                            // Lấy thông tin sản phẩm từ cơ sở dữ liệu
                            const product = await db.Product.findOne({
                                where: { id: productOrder.productId },
                            });

                            if (product) {
                                const updatedAmount =
                                    product.amount -
                                    parseInt(productOrder.quantity);
                                const updatedSold =
                                    product.sold_amount +
                                    parseInt(productOrder.quantity);
                                console.log(updatedSold, updatedAmount);
                                const res = await product.update({
                                    amount: updatedAmount,
                                    sold_amount: updatedSold,
                                });
                                console.log(res);
                                return res;
                            } else {
                                // Xử lý trường hợp không tìm thấy sản phẩm
                                console.log(
                                    `Không tìm thấy sản phẩm với ID: ${productOrder.productId}`
                                );
                            }
                        } catch (error) {
                            // Xử lý lỗi nếu có
                            console.error(
                                `Lỗi khi cập nhật sản phẩm: ${error.message}`
                            );
                        }
                    }

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
                        city: data.city,
                        district: data.district,
                        ward: data.ward,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        delivery: data.deliveryMethod,
                        payment: data.paymentMethod,
                        totalPayment: data.totalPrice,
                        shipFee: data.deliveryPrice,
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

                    for (const productOrder of data.cart) {
                        try {
                            // Lấy thông tin sản phẩm từ cơ sở dữ liệu
                            const product = await db.Product.findOne({
                                where: { id: productOrder.productId },
                            });

                            if (product) {
                                const updatedAmount =
                                    product.amount -
                                    parseInt(productOrder.quantity);
                                const updatedSold =
                                    product.sold_amount +
                                    parseInt(productOrder.quantity);
                                console.log(updatedSold, updatedAmount);
                                const res = await db.Product.update(
                                    {
                                        amount: updatedAmount,
                                        sold_amount: updatedSold,
                                    },
                                    {
                                        where: {
                                            id: product.id,
                                        },
                                        returning: true,
                                    }
                                );
                                console.log(res);
                            } else {
                                // Xử lý trường hợp không tìm thấy sản phẩm
                                console.log(
                                    `Không tìm thấy sản phẩm với ID: ${productOrder.productId}`
                                );
                            }
                        } catch (error) {
                            // Xử lý lỗi nếu có
                            console.error(
                                `Lỗi khi cập nhật sản phẩm: ${error.message}`
                            );
                        }
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

    getAllOrders: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const orders = await db.Order.findAll({
                    raw: true,
                    order: [["createdAt", "DESC"]],
                });
                const details = [];

                // Lặp qua mỗi đơn hàng để lấy chi tiết tương ứng
                for (let order of orders) {
                    const orderDetails = await db.Detail.findAll({
                        where: {
                            order_id: order.id,
                        },
                    });

                    details.push({
                        orderId: order.id,
                        details: orderDetails,
                    });
                }

                resolve({
                    orders,
                    details,
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    editStatus: async (orderId, status) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedOrder = await db.Order.update(
                    { status: status }, 
                    {
                        where: {
                            id: orderId
                        },
                    }
                );

                console.log(updatedOrder); 

                resolve({
                    errCode: 0,
                    errMessage: "Success",
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
};

module.exports = orderService;
