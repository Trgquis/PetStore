"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "categories",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                parent_id: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                sort_order: {
                    allowNull: false,
                    type: Sequelize.SMALLINT,
                },
                // createdAt: {
                //     allowNull: false,
                //     type: Sequelize.DATE
                // },
                // updatedAt: {
                //     allowNull: false,
                //     type: Sequelize.DATE
                // }
            },
            {
                freezeTableName: true,
            }
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("categories");
    },
};
