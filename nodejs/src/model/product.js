"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Images, {
                foreignKey: "product_id",
                sourceKey: "id",
            });

            Product.belongsTo(models.ChildCategories, {
                foreignKey: "category_id",
                targetKey: "id",
            });

            Product.belongsTo(models.Categories, {
                foreignKey: "parent_id",
                targetKey: "id",
            });

            Product.belongsTo(models.RootCategories, {
                foreignKey: "root_id",
                targetKey: "id",
            });

            Product.hasMany(models.Detail, {
                foreignKey: "product_id",
                sourceKey: "id",
            });

            Product.belongsToMany(models.Order, {
                through: "details",
                foreignKey: "product_id",
            });

            Product.belongsToMany(models.Review, {
                foreignKey: "user_id",
            });
        }
    }
    Product.init(
        {
            // id: DataTypes.INTEGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            root_id: DataTypes.INTEGER,
            parent_id: DataTypes.INTEGER,
            category_id: DataTypes.INTEGER,
            code: DataTypes.STRING,
            name: DataTypes.STRING,
            price: DataTypes.REAL,
            discount: DataTypes.REAL,
            content: DataTypes.TEXT,
            amount: DataTypes.INTEGER,
            sold_amount: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
            tableName: "products",
            timestamps: false,
            // underscored: true,
        }
    );
    return Product;
};
