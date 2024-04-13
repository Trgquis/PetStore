const orderService = require("../service/orderService");
const { v4: uuidv4 } = require("uuid");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
const db = require("../model/server");
const productService = require("../service/productService");
const generateUniqueUserId = () => {
    return uuidv4(); // Tạo một UUID duy nhất
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
    console.log(message);
    return res.status(200).json(message);
};

const handleAddCart = async (req, res) => {
    const data = req.body;
    console.log(data);
    if (!data || !data.product_id || !data.quantity) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Invalid input data",
        });
    }
    try {
        // Lấy hoặc tạo một định danh duy nhất cho người dùng từ cookies
        let userId = req.cookies.userId;
        if (!userId) {
            userId = generateUniqueUserId(); // Hàm này sẽ tạo một định danh duy nhất
            res.cookie("userId", userId, { maxAge: 24 * 60 * 60 * 1000 }); // Max age: 24 giờ
        }
        res.cookie("userId", userId, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });
        // Xử lý logic thêm sản phẩm vào giỏ hàng
        let cartData = req.cookies.cartData || {};
        console.log(cartData);
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
            secure: false,
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

// const getAllCart = async (req, res) => {
//     try {
//         // Lấy thông tin giỏ hàng từ localStorage
//         const cartData = JSON.parse(localStorage.getItem("cartData")) || {};

//         // Mảng để lưu trữ thông tin sản phẩm trong giỏ hàng
//         const cartItems = [];

//         // Tổng số lượng sản phẩm trong giỏ hàng
//         let totalQuantity = 0;

//         // Lặp qua từng mục trong giỏ hàng
//         for (const productId in cartData) {
//             const item = cartData[productId];
//             // Gọi hàm getProduct để lấy thông tin sản phẩm từ cơ sở dữ liệu
//             const product = await productService.getProductById(productId);
//             if (product) {
//                 cartItems.push({
//                     product: product,
//                     quantity: item.quantity,
//                 });
//                 // Cộng dồn vào tổng số lượng sản phẩm
//                 totalQuantity += item.quantity;
//             }
//         }

//         return res.status(200).json({
//             cartItems: cartItems,
//             totalQuantity: totalQuantity,
//         });
//     } catch (error) {
//         console.error("Error getting cart:", error);
//         return res.status(500).json({
//             errCode: 2,
//             errMessage: "Internal Server Error",
//         });
//     }
// };

const getAllCart = async (req, res) => {
    try {
        // Get cart data from cookies
        let cartData = req.cookies.cartData || {};
        console.log(cartData);

        // Total quantity of products in the cart
        let totalQuantity = 0;

        // Array to store product information
        const productList = [];
        let cart = []
        // Get product information from productService
        for (const productId in cartData) {
            const item = cartData[productId];
            const productInfo = await productService.getProductById(productId);
            if (productInfo) {
                // Add quantity to total quantity
                totalQuantity += item.quantity;
                cart.push({
                    product: productInfo,
                    quantity: item.quantity
                });
            }
        }

        console.log(cart);
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

const deleteCartItem = async () => {
    try {
        // Xóa tất cả các mục trong localStorage có key là "cartData"
        localStorage.removeItem("cartData");
        console.log("Cart data has been deleted successfully.");
        // Hoặc nếu bạn muốn xóa tất cả các mục trong localStorage, bạn có thể sử dụng:
        // localStorage.clear();
        // console.log("All localStorage data has been deleted successfully.");
    } catch (error) {
        console.error("Error deleting cart data:", error);
        // Xử lý lỗi ở đây nếu cần thiết
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
    console.log(message);
    return res.status(200).json(message);
};
module.exports = {
    handleSubmitOrder: handleSubmitOrder,
    handleAddCart: handleAddCart,
    getAllCart: getAllCart,
    getOrder: getOrder,
    deleteCartItem: deleteCartItem,
};
