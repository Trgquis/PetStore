const orderService = require("../service/orderService");
const { v4: uuidv4 } = require("uuid");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
const db = require("../model/server");
const productService = require("../service/productService");
const { INTEGER, STRING } = require("sequelize");

const generateUniqueUserId = () => {
    return uuidv4();
};

let handleSubmitOrder = async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing Parameters",
        });
    }
    let message = await orderService.handleSubmitOrder(data);
    // console.log("return", message);
    if (message.isGuest) {
        res.cookie("submittedOrder", message, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
    }
    return res.status(200).json(message);
};

const handleAddCart = async (req, res) => {
    const data = req.body;
    // console.log(data);
    if (!data || !data.product_id || !data.quantity) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Invalid input data",
        });
    }
    try {
        let requestId = req.cookies.guestuserId;
        if (data.userId) {
            userId = data.userId;
            // console.log(userId);
            res.clearCookie("guestuserId");
            res.cookie("userId", userId, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
        } else {
            res.clearCookie("userId");
            if (!requestId) {
                const id = generateUniqueUserId();
                res.cookie("guestuserId", id, { maxAge: 24 * 60 * 60 * 1000 });
            }
        }

        // Xử lý logic thêm sản phẩm vào giỏ hàng
        let cartData = req.cookies.cartData || {};
        // console.log(cartData);
        const productId = parseInt(data.product_id); // Chuyển đổi product_id thành số nguyên
        const qt = parseInt(data.quantity); // Chuyển đổi quantity thành số nguyên
        if (isNaN(productId) || isNaN(qt)) {
            throw new Error("Invalid input data");
        }

        if (!cartData[data.product_id]) {
            cartData[data.product_id] = {
                productId: parseInt(data.product_id),
                quantity: parseInt(data.quantity),
            };
        } else {
            cartData[data.product_id].quantity += parseInt(data.quantity);
        }

        // Lưu thông tin giỏ hàng vào cookies
        res.cookie("cartData", cartData, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }); // Max age: 24 giờ
        return res.status(200).json("success");
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({
            errCode: 2,
            errMessage: "Internal Server Error",
        });
    }
};

const handleRemoveCart = async (req, res) => {
    const data = req.query.productID;
    // console.log(data);
    if (!data) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Invalid input data",
        });
    }
    try {
        let cartData = req.cookies.cartData || {};
        // console.log(cartData);
        const productId = parseInt(data); // Chuyển đổi product_id thành số nguyên
        if (isNaN(productId)) {
            throw new Error("Invalid input data");
        }

        if (cartData[data] && cartData[data].quantity > 1) {
            cartData[data].quantity -= 1; // Giảm số lượng sản phẩm đi 1
        } else if (cartData[data] && cartData[data].quantity === 1) {
            delete cartData[data]; // Nếu số lượng là 1 thì loại bỏ sản phẩm khỏi giỏ hàng
        }

        // Lưu thông tin giỏ hàng vào cookies
        res.cookie("cartData", cartData, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }); // Max age: 24 giờ
        return res.status(200).json("success");
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({
            errCode: 2,
            errMessage: "Internal Server Error",
        });
    }
};

const getAllCart = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (userId) {
            // console.log(userId);
        }
        let cartData = req.cookies.cartData || {};
        // console.log(cartData);

        let totalQuantity = 0;

        // const productList = [];
        let cart = [];
        for (const productId in cartData) {
            const item = cartData[productId];
            const productInfo = await productService.getProductById(productId);
            if (productInfo) {
                // Add quantity to total quantity
                totalQuantity += item.quantity;
                cart.push({
                    product: productInfo,
                    quantity: item.quantity,
                });
            }
        }

        // console.log(cart);
        return res.status(200).json({
            cart,
            totalQuantity,
        });
    } catch (error) {
        console.error("Error getting cart:", error);
        return res.status(500).json({
            errCode: 2,
            errMessage: "Internal Server Error",
        });
    }
};

const deleteCartItem = async (req, res) => {
    const productId = req.query.productID;
    // console.log(productId);
    if (!productId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Product ID is required",
        });
    }
    try {
        let cartData = req.cookies.cartData || {};
        // console.log(cartData);

        if (!cartData[productId]) {
            return res.status(400).json({
                errCode: 3,
                errMessage: "Product not found in cart",
            });
        } else {
            delete cartData[productId];
        }

        res.cookie("cartData", cartData, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json("success");
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.status(500).json({
            errCode: 4,
            errMessage: "Internal Server Error",
        });
    }
};

let getOrder = async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing Parameters",
        });
    }
    let message = await orderService.getOrder(userId);
    // console.log(message);
    return res.status(200).json(message);
};

const handleGetAllOrders = async (req, res) => {
    let message = await orderService.getAllOrders();
    return res.status(200).json(message);
};

const handleEditStatus = async (req, res) => {
    const orderId = parseInt(req.body.id);
    const status = req.body.status;
    // console.log(status);
    let message = await orderService.editStatus(orderId, status);
    return res.status(200).json(message);
};
module.exports = {
    handleSubmitOrder: handleSubmitOrder,
    handleAddCart: handleAddCart,
    handleRemoveCart: handleRemoveCart,
    getAllCart: getAllCart,
    getOrder: getOrder,
    deleteCartItem: deleteCartItem,
    handleGetAllOrders: handleGetAllOrders,
    handleEditStatus: handleEditStatus,
};
