"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "products",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                catalog_id: {
                    // new foreign key column
                    allowNull: true,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "categories",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                quantity: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                price: {
                    allowNull: false,
                    type: Sequelize.REAL,
                },
                discount: {
                    allowNull: false,
                    type: Sequelize.REAL,
                },
                content: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
            },
            {
                freezeTableName: true,
            }
        );
        queryInterface.addConstrain;
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("products");
    },
};
