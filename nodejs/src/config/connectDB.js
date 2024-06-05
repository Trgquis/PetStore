const Sequelize = require("sequelize");
// const sequelize = new Sequelize({
//     dialect: "postgres",
//     database: "postgres",
//     username: "postgres.xuvkitjdclpsegbbrutg",
//     password: "emlaQui@150602",
//     host: "aws-0-ap-southeast-1.pooler.supabase.com",
//     port: 5432,
//     logging: false,
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         },
//     },
// });
const sequelize = new Sequelize({
    dialect: "postgres",
    database: "petstore",
    username: "postgres",
    password: 150602,
    host: "localhost",
    port: 5432,
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
