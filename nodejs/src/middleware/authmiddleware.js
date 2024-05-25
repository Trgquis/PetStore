const jwt = require("jsonwebtoken");

const AuthMiddleware = {
    verifyToken: (req, res, next) => {
        const userToken = req.headers.token;
        if (userToken) {
            const accessToken = userToken.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                // console.log(user);
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },

    verifyAdminToken: (req, res, next) => {
        // console.log(req.user);
        AuthMiddleware.verifyToken(req, res, () => {
            if (parseInt(req.user.roleId) === 1) {
                // // console.log(req.user.roleId)
                next();
            } else {
                // console.log("dont have permission");
                return res.status(403).json("You dont have permission!");
            }
        });
    },
    // verifyManagerToken: (req, res, next) => {
    //     AuthMiddleware.verifyToken(req, res, () => {
    //         if (parseInt(req.user.roleId) === 2) {
    //             // // console.log(req.user.roleId)
    //             next();
    //         } else {
    //             // console.log("dont have permission");
    //             return res.status(403).json("You dont have permission!");
    //         }
    //     });
    // },
};

module.exports = AuthMiddleware;
