"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "orders",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                user_id: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                    references: {
                        model: "users",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                guestuser_id: {
                    allowNull: false,
                    type: Sequelize.STRING,
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                city: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                district: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                ward: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                status: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
            },
            {
                freezeTableName: true,
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("orders");
    },
};
