const orderService = require("../service/orderService");

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

let handleAddCart = async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing Parameters",
        });
    }
    let message = await orderService.handleAddCart(data);
    console.log(message);
    return res.status(200).json(message);
};

let getAllCart = async (req, res) => {
    const userId = req.query.user_id;
    if (!userId) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing Parameters",
        });
    }
    let message = await orderService.getAllCart(userId);
    console.log(message);
    return res.status(200).json(message);
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
};
