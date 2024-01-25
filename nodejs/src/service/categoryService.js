import db from "../models/index";
const { Op, where } = require("sequelize");

const categoryService = {
    checkCatalog: (catalogInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(catalogInfo)
                let catalog = await db.Catalogs.findOne({
                    where: {
                        [Op.or]: [
                            { name: catalogInfo.name },
                            {
                                [Op.and]: [
                                    { parent_id: catalogInfo.parent_id },
                                    { sort_order: catalogInfo.sort_order },
                                ],
                            },
                        ],
                    },
                });
                if (catalog) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                reject(e);
            }
        });
    },

    createNewCatalog: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                // Check thông tin về tên danh mục vị trí sắp xếp
                let inspect = await checkCatalog(data);
                // let secondInspect = await checkParentandSort(data.parent_id, data.sort_order)
                if (inspect === true) {
                    resolve({
                        errCode: 1,
                        errMessage: "Catalog is existed!",
                    });
                } else {
                    await db.Catalogs.create({
                        name: data.name,
                        parent_id: data.parent_id || null,
                        sort_order: data.sort_order,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                    });
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    getAllCatalogs: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let catalogs = "";
                catalogs = await db.Catalogs.findAll({
                    attributes: {
                        raw: true,
                    },
                });
                let count = await db.Catalogs.count({});
                let result = { catalogs, count };
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    },

    getChildCatalog: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let catalog = "";
                catalog = await db.Catalogs.findAll({
                    where: { parent_id: { [Op.not]: null } },
                });
                resolve(catalog);
            } catch (e) {
                console.log(e);
                // reject(e);
            }
        });
    },
    updateCatalog: (catalogdata) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(catalogdata);
                if (!catalogdata.id) {
                    resolve({
                        errCode: 2,
                        errMessage: "Missing parameters",
                    });
                }

                let catalog = await db.Catalogs.findOne({
                    where: { id: catalogdata.id },
                    raw: false,
                });
                if (catalog) {
                    (catalog.name = catalogdata.name),
                        (catalog.parent_id = catalogdata.parent_id),
                        (catalog.sort_order = catalogdata.sort_order),
                        await catalog.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Update Success!",
                    });
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: "Catalog not found",
                    });
                }
            } catch (e) {
                console.log(e);
            }
        });
    },

    deleteCatalog: async (catalogId) => {
        try {
            return new Promise(async (resolve, reject) => {
                let catalog = await db.Catalogs.findOne({
                    where: { id: catalogId },
                });

                if (!catalog) {
                    resolve({
                        errCode: 2,
                        errMessage: "Catalog is not exist",
                    });
                }
                await db.Catalogs.destroy({
                    where: { id: catalogId },
                });
                resolve({
                    errCode: 0,
                    errMessage: "Catalog is deleted",
                });
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    },
};

module.exports = categoryService;
