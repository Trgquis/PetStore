"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // define association here
            Order.hasMany(models.Detail, {
                foreignKey: "order_id",
                sourceKey: "id",
            });

            // models.User.hasMany(Orders, {foreignKey:'user_id', sourceKey:'id'})
            Order.belongsTo(models.User, {
                foreignKey: "user_id",
                targetKey: "id",
            });
            Order.belongsTo(models.GuestUser, {
                foreignKey: "guestuser_id",
                targetKey: "id",
            });

            Order.belongsToMany(models.Product, {
                through: "details",
                foreignKey: "order_id",
            });

            
        }
    }
    Order.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: DataTypes.INTEGER,
            guestuser_id: DataTypes.INTEGER,
            city: DataTypes.STRING,
            district: DataTypes.STRING,
            ward: DataTypes.STRING,
            address: DataTypes.STRING,
            phonenumber: DataTypes.STRING,
            delivery: DataTypes.STRING,
            payment: DataTypes.STRING,
            shipFee: DataTypes.REAL,
            totalPayment: DataTypes.REAL,
            status: DataTypes.TEXT, //Trạng thái của đơn hàng (đang xử lý, hoàn thành, hủy bỏ)
        },
        {
            sequelize,
            modelName: "Order",
            tableName: "orders",
            timestamps: false,
        }
    );
    return Order;
};
