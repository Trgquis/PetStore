const Sequelize = require("sequelize");
const sequelize = new Sequelize("petstore", "postgres", "150602", {
    dialect: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: 150602,
    database: "petstore",
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = connectDB;
