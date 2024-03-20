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
            }); // mỗi sản phẩm thuộc một danh mục

            Product.hasMany(models.Detail, {
                foreignKey: "product_id",
                sourceKey: "id",
            });

            Product.belongsToMany(models.Order, {
                through: "details",
                foreignKey: "product_id",
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
            category_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            price: DataTypes.REAL,
            discount: DataTypes.REAL,
            content: DataTypes.TEXT,
            amount: DataTypes.INTEGER,
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
