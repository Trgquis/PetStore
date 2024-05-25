const userService = require("../service/userService");

const Authenticate = {
    authUser: async (req, res, next) => {
        const { id } = req.body;
        // console.log(id);
        if (!id) {
            return res.status(403).json("You need to sign in!");
        }

        let user = await userService.GetUser(id);
        // console.log(user);
        if (!user) {
            return res.status(403).json("User not found!");
        }
        req.user = user;
        next();
    },

    auth: (permission) => {
        return async (req, res, next) => {
            let { roleId } = await req.user;
            // console.log(roleId);
            if (!permission.includes(roleId)) {
                return res.status(401).json("You dont have permission!");
            }
            next();
        };
    },
};

module.exports = Authenticate;
