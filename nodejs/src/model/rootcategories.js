"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class RootCategories extends Model {
        static associate(models) {
            // define association here
            RootCategories.hasMany(models.Categories, {
                foreignKey: "rootcategory_id",
                sourceKey: "id",
            }); 
            RootCategories.hasMany(models.Product, {
                foreignKey: "root_id",
                sourceKey: "id",
            });
        }
    }
    RootCategories.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            priority: DataTypes.SMALLINT,
        },
        {
            sequelize,
            modelName: "RootCategories",
            tableName: "rootcategories",
            timestamps: false,
            // underscored: true,
        }
    );
    return RootCategories;
};
