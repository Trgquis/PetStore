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
                category_id: {
                    // new foreign key column
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "childcategories",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
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
                amount: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
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
