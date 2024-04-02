"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "images",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                product_id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "products",
                        key: "id",
                    },
                },
                secure_url: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                cloudinary_public_id: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
            },
            {
                freezeTableName: true,
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("images");
    },
};
