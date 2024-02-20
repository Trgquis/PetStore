"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Image extends Model {
        static associate(models) {
            // define association here
            Image.belongsTo(models.Product, {
                foreignKey: "product_id",
                targetKey: "id",
            });
        }
    }
    Image.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            type: DataTypes.STRING,
            image_name: DataTypes.STRING,
            path: DataTypes.STRING,
            product_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Image",
            tableName: "iamges",
            timestamps: false,
            // underscored: true,
        }
    );
    return Image;
};
