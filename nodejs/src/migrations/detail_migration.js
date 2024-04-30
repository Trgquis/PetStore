"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "details",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                product_id: {
                    // new foreign key column
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "products",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                order_id: {
                    // new foreign key column
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "orders",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                quantity: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },

                total_price: {
                    allowNull: false,
                    type: Sequelize.REAL,
                },
                status: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                createdAt: {
                    type: "TIMESTAMP",
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    allowNull: false,
                },
                updatedAt: {
                    type: "TIMESTAMP",
                    defaultValue: Sequelize.literal(
                        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                    ),
                    allowNull: false,
                },
            },
            {
                freezeTableName: true,
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("details");
    },
};
