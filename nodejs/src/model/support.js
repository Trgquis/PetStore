"use strict";
const { Model } = require("sequelize");
module.exports = async (sequelize, DataTypes) => {
    class Support extends Model {
        static associate(models) {
            // define association here
            Support.hasMany(models.Categories, {
                foreignKey: "rootcategory_id",
                sourceKey: "id",
            }); // một danh mục có nhiều sản phẩm
            //   models.Products.belongsTo(Catalogs, { foreignKey: 'catalog_id' }); // mỗi sản phẩm thuộc một danh mục
        }
    }
    Support.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Open",
            },
        },
        {
            sequelize,
            modelName: "Support",
            tableName: "supports",
            timestamps: false,
            // underscored: true,
        }
    );
    return Support;
};
