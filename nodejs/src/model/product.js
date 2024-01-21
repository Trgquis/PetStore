"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Images, {
                foreignKey: "product_id",
                sourceKey: "id",
            });

            Product.belongsTo(models.Categories, {
                foreignKey: "catalog_id",
                targetKey: "id",
            }); // mỗi sản phẩm thuộc một danh mục

            // Product.hasMany(models.ProductOrders, {
            //     foreignKey: "product_id",
            //     sourceKey: "id",
            // });
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
            catalog_id: DataTypes.INTEGER,
            name: DataTypes.STRING,
            quantity: DataTypes.INTEGER, //Sản phẩm còn trong kho hàng
            price: DataTypes.REAL,
            discount: DataTypes.REAL,
            content: DataTypes.TEXT,
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
