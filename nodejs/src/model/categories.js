"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate(models) {
            // define association here
            Categories.hasMany(models.ChildCategories, {
                foreignKey: "parent_id",
                sourceKey: "id",
            }); // một danh mục có nhiều sản phẩm
            Categories.belongsTo(models.RootCategories, {
                foreignKey: "rootcategory_id",
            });
        }
    }
    Categories.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            rootcategory_id: DataTypes.INTEGER,
            priority: DataTypes.SMALLINT,
        },
        {
            sequelize,
            modelName: "Categories",
            tableName: "categories",
            timestamps: false,
            // underscored: true,
        }
    );
    return Categories;
};
