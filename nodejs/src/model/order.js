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

            // Order.hasOne(models.Transaction, {
            //     foreignKey: "order_id",
            //     sourceKey: "id",
            // });
            // models.Transactions.belongsTo(Orders, { foreignKey: 'order_id', targetKey: 'id' });
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
