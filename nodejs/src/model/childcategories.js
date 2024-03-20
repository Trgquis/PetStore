"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class ChildCategories extends Model {
        static associate(models) {
            // define association here
            ChildCategories.hasMany(models.Product, {
                foreignKey: "category_id",
                sourceKey: "id",
            }); // một danh mục có nhiều sản phẩm
            //   models.Products.belongsTo(Catalogs, { foreignKey: 'catalog_id' }); // mỗi sản phẩm thuộc một danh mục
            ChildCategories.belongsTo(models.Categories, {
                foreignKey: "parent_id",
            });
        }
    }
    ChildCategories.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            parent_id: DataTypes.INTEGER,
            priority: DataTypes.SMALLINT,
        },
        {
            sequelize,
            modelName: "ChildCategories",
            tableName: "childcategories",
            timestamps: false,
            // underscored: true,
        }
    );
    return ChildCategories;
};
