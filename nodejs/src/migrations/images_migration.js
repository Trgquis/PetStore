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
                path: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                product_id: {
                    // new foreign key column
                    allowNull: true,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "products",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                user_id: {
                    // new foreign key column
                    allowNull: true,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "users",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
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
