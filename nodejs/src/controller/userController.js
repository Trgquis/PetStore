const userService = require("../service/userService.js");
const db = require("../model/server.js");
const userController = {
    handleGetAllUsers: async (req, res) => {
        let users = await userService.GetAllUsers();
        // console.log(users);
        return res.status(200).json({
            // errCode: 0,
            // errMessage: 'OK',
            users,
        });
    },

    handleRegist: async (req, res) => {
        // const avatar = req.file;
        const data = {
            email: String(req.body.email),
            password: String(req.body.password),
            firstName: String(req.body.firstName),
            lastName: String(req.body.lastName),
            address: String(req.body.address),
            phonenumber: String(req.body.phonenumber),
            gender: parseInt(req.body.gender, 10),
            roleId: 1,
        };
        console.log(req.body);
        let message = await userService.Regist(data);
        console.log(message);
        return res.status(200).json(message);
    },

    handleLogin: async (req, res) => {
        const data = {
            email: String(req.body.email),
            password: String(req.body.password),
        };
        console.log(req.body);
        let message = await userService.Login(data);
        console.log(message);
        return res.status(200).json(message);
    },

    listModels: async (req, res) => {
        try {
            const modelsList = await Object.keys(db.sequelize.models);
            return res.status(200).json({
                models: modelsList,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Internal Server Error",
            });
        }
    },
};

module.exports = userController;
