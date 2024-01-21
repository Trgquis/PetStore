"use strict";

const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const envConfig = require("../config/config.json");
const config = envConfig[env];

const db = {};

let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

// Load models from files in the models directory
const modelsDir = path.join(__dirname, ""); // Adjust the directory path as needed
fs.readdirSync(modelsDir)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(modelsDir, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

// Add models to the db object
Object.values(sequelize.models).forEach((model) => {
    db[model.name] = model;
});

// Export the Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
