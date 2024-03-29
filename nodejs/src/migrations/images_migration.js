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
                type: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                image_name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                product_id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "products",
                        key: "id",
                    },
                },
                path: {
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
