const db = require("../model/server.js");
const bcrypt = require("bcryptjs");
const path = require("path");
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

    Login: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const email = data.email;
                const password = data.password;
                const existed = await this.checkEmailExisted(email);
                if (existed) {
                    let user = await db.User.findOne({
                        where: { email: email },
                        raw: true,
                    });

                    if (user) {
                        let inspect = false;
                        if (user.password === password) {
                            inspect = true;
                        }
                    }
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },
};

module.exports = userService;
