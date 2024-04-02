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
            secure_url: DataTypes.STRING,
            product_id: DataTypes.INTEGER,
            cloudinary_public_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Image",
            tableName: "images",
            timestamps: false,
            // underscored: true,
        }
    );
    return Image;
};
