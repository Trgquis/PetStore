"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate(models) {
            // define association here
            Categories.hasMany(models.Product, {
                foreignKey: "catalog_id",
                sourceKey: "id",
            }); // một danh mục có nhiều sản phẩm
            //   models.Products.belongsTo(Catalogs, { foreignKey: 'catalog_id' }); // mỗi sản phẩm thuộc một danh mục
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
            parent_id: DataTypes.INTEGER,
            sort_order: DataTypes.SMALLINT,
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
