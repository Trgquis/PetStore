"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            // models.User.hasMany(Orders, {foreignKey:'user_id', sourceKey:'id'})
            Review.belongsTo(models.User, {
                foreignKey: "user_id",
                targetKey: "id",
            });
            Review.belongsTo(models.Product, {
                foreignKey: "product_id",
                targetKey: "id",
            });
        }
    }
    Review.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: DataTypes.INTEGER,
            product_id: DataTypes.INTEGER,
            score: DataTypes.REAL,
            comment: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Review",
            tableName: "reviews",
            timestamps: true,
        }
    );
    return Review;
};
