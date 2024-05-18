const userService = require("../service/userService.js");
const db = require("../model/server.js");
const jwt = require("jsonwebtoken");

const TokenArr = [];

const Token = {
    generateAccessToken: (userdata) => {
        console.log(userdata);
        return jwt.sign(
            {
                email: userdata.user.email,
                roleId: userdata.user.roleId,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "1d" }
        );
    },

    generateRefreshToken: (userData) => {
        return jwt.sign(
            {
                email: userData.user.email,
                roleId: userData.user.roleId,
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

    handleGetUser: async (req, res) => {
        id = req.query.id;
        console.log(id);
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters",
                users: [],
            });
        }
        const user = await userService.GetUser(id);
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
            roleId: "0",
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
        let userData = await userService.Login(data);
        console.log(userData);
        if (!userData.success) {
            res.status(401).json({
                errCode: 1,
                errMessage: "Error while login",
            });
        }
        const accessToken = Token.generateAccessToken(userData);
        const refreshToken = Token.generateRefreshToken(userData);

        TokenArr.push({ userData, refreshToken });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });

        return res.status(200).json({ userData, accessToken });
    },

    handleLogout: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        const userId = req.cookies.userId;
        if (refreshToken) {
            const index = TokenArr.findIndex(
                (token) => token.refreshToken === refreshToken
            );
            if (index !== -1) {
                TokenArr.splice(index, 1);
            }
        }
        res.clearCookie("userId");
        res.clearCookie("refreshToken");
        res.status(200).json("Logout Success!");
    },
    handleUpdateUser: async (req, res) => {
        try {
            const data = req.body;
            const mess = await userService.EditUser(data);
            return res.status(200).json(mess);
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                error: "Error",
            });
        }
    },
    handleDeleteUser: async (req, res) => {
        try {
            const id = req.query.id;
            await userService.DeleteUser(id);
            return res.status(200).json({
                message: "oke",
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                error: "Error",
            });
        }
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
