const db = require("../model/server.js");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const userService = {
    GetAllUsers: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                    raw: true,
                });

                let count = await db.User.count({});
                let result = { users, count };
                console.log(result);
                resolve(result);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    GetUser: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = "";
                if (id) {
                    user = await db.User.findOne({
                        where: { id: id },
                        attributes: {
                            exclude: ["password"],
                        },
                        raw: true,
                    });
                }
                console.log(user);
                resolve(user);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    checkEmailExisted: async (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.User.findOne({
                    where: { email: email },
                });
                console.log(user);
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                reject(e);
            }
        });
    },

    hashPassword: async (password) => {
        return new Promise(async (resolve, reject) => {
            try {
                let hashPassWord = await bcrypt.hashSync(password, salt);
                resolve(hashPassWord);
            } catch (e) {
                reject(e);
            }
        });
    },

    Regist: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let inspect = await userService.checkEmailExisted(data.email);
                if (inspect) {
                    resolve({
                        errCode: 1,
                        Message: "Email is existed",
                    });
                } else {
                    let hashedPassWord = await userService.hashPassword(
                        data.password
                    );
                    await db.User.create({
                        email: data.email,
                        password: hashedPassWord,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        roleId: data.roleId,
                    });
                    resolve({
                        errCode: 0,
                        Message: "Completed",
                    });
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    DeleteUser: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await db.User.destroy({
                    where: {
                        id: id,
                    },
                });
                console.log(res);
                resolve({
                    errCode: 0,
                    errMessage: "Oke",
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
    Login: async (data) => {
        try {
            const email = data.email;
            const password = data.password;

            const user = await db.User.findOne({
                where: { email: email },
                raw: true,
            });

            if (!user) {
                return {
                    success: false,
                    message: "User not found",
                };
            }

            const match = bcrypt.compareSync(password, user.password);
            if (match) {
                delete user.password;
                return {
                    success: true,
                    user: user,
                };
            } else {
                return {
                    success: false,
                    message: "Incorrect password",
                };
            }
        } catch (error) {
            throw error;
        }
    },

    EditUser: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await db.User.update(
                    {
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phonenumber: data.phonenumber,
                        gender: data.gender,
                        roleId: 0,
                    },
                    {
                        where: { id: data.id },
                    }
                );
                console.log(user);
                resolve({
                    errCode: 0,
                    errMessage: "Oke",
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
};

module.exports = userService;
