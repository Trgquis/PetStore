"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class RootCategories extends Model {
        static associate(models) {
            // define association here
            RootCategories.hasMany(models.Categories, {
                foreignKey: "rootcategory_id",
                sourceKey: "id",
            }); // một danh mục có nhiều sản phẩm
            //   models.Products.belongsTo(Catalogs, { foreignKey: 'catalog_id' }); // mỗi sản phẩm thuộc một danh mục
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
