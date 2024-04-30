"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Detail extends Model {
        static associate(models) {
            // define association here
            Detail.belongsToMany(models.Product, {
                foreignKey: "product_id",
                targetKey: "id",
            });
            Detail.belongsTo(models.Order, {
                foreignKey: "order_id",
                targetKey: "id",
            });
        }
    }
    Detail.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            product_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "products",
                    key: "id",
                },
            },
            order_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: "orders",
                    key: "id",
                },
            },
            quantity: DataTypes.INTEGER, //Số lượng các sản phẩm đc đặt
            total_price: DataTypes.REAL,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Detail",
            tableName: "details",
            underscored: true,
            // timestamps: false
        }
    );
    return Detail;
};
