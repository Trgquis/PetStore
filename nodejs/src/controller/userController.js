const userService = require("../service/userService.js");
const db = require("../model/server.js");
const jwt = require("jsonwebtoken");

const TokenArr = [];

const Token = {
    generateAccessToken: (userdata) => {
        console.log(userdata);
        return (
            jwt.sign({
                email: userdata.email,
                roleId: userdata.roleId,
            }),
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "1d" }
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                email: user.email,
                roleId: user.roleId,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "1d" }
        );
    },
    RefreshAccessToken: (user) => {
        return jwt.sign(
            {
                email: user.email,
                roleId: user.roleId,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "1d" }
        );
    },

    NewRefreshToken: (user) => {
        return jwt.sign(
            {
                email: user.email,
                roleId: user.roleId,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        // res.status(200).json(refreshToken)
        if (!refreshToken || refreshToken === undefined) {
            return res.status(401).json("You're not authenticated!");
        }

        const tokenData = Tokens.find(
            (token) => token.refreshToken === refreshToken
        );
        if (!tokenData) {
            return res.status(401).json("Invalid refresh token!");
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(401).json("Error: ", err);
            }
            const newAccessToken = RefreshAccessToken(user);
            const newRefreshToken = NewRefreshToken(user);
            // Cập nhật Refresh Token mới vào mảng Tokens
            const index = Tokens.findIndex(
                (token) => token.refreshToken === refreshToken
            );
            Tokens[index].refreshToken = newRefreshToken;

            res.cookie("newRefreshToken", newRefreshToken, {
                httpOnly: true,
                security: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        });
    },
};

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

    handleGetUser: async(req, res) => {
        id = req.query.id
        console.log(id)
        if(!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
                users: [],
            });
        }
        const user = await userService.GetUser(id)
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            user,
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

    handleLogout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const index = Tokens.findIndex(
                (token) => token.refreshToken === refreshToken
            );
            if (index !== -1) {
                Tokens.splice(index, 1);
            }
        }
        res.clearCookie("refreshToken");
        res.status(200).json("Logout Success!");
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

(module.exports = userController), Token;
