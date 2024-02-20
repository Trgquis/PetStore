const db = require("../model/server");
const { Op, where } = require("sequelize");

const categoryService = {
    checkRoot: async (rootInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(rootInfo);
                let root = await db.RootCategories.findOne({
                    where: {
                        name: rootInfo.name,
                    },
                });
                if (root) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                reject(e);
            }
        });
    },

    checkCatalog: async (catalogInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(catalogInfo)
                let catalog = await db.Categories.findOne({
                    where: {
                        name: catalogInfo.name,
                    },
                });

                if (catalog) {
                    console.log(catalog);
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                reject(e);
            }
        });
    },

    createNewRoot: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                let inspect = await categoryService.checkRoot(data);
                // let secondInspect = await checkParentandSort(data.parent_id, data.sort_order)
                if (inspect === true) {
                    resolve({
                        errCode: 1,
                        errMessage: "Root Category is existed!",
                    });
                } else {
                    await db.RootCategories.create({
                        name: data.name,
                        priority: data.priority,
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

    editRoot: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const rootId = data.id;
                const newRootName = data.name;
                const rootCategory = await db.RootCategories.update(
                    {
                        name: newRootName,
                    },
                    {
                        where: {
                            id: rootId,
                        },
                    }
                );

                console.log(rootCategory);
                resolve({
                    errCode: 0,
                    errMessage: "Oke",
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    createNewCatalog: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                // Check thông tin về tên danh mục vị trí sắp xếp
                let inspect = await categoryService.checkCatalog(data);
                // let secondInspect = await checkParentandSort(data.parent_id, data.sort_order)
                if (inspect === true) {
                    resolve({
                        errCode: 1,
                        errMessage: "Catalog is existed!",
                    });
                } else {
                    await db.Categories.create({
                        name: data.name,
                        rootcategory_id: data.rootcategory_id,
                        priority: data.priority,
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

    getAllRoot: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let roots = "";
                roots = await db.RootCategories.findAll({
                    attributes: {
                        raw: true,
                    },
                });
                let count = await db.RootCategories.count({});
                let result = { roots, count };
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    },

    getAllCatalogs: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let catalogs = "";
                catalogs = await db.Categories.findAll({
                    attributes: {
                        raw: true,
                    },
                });
                let count = await db.Categories.count({});
                let result = { catalogs, count };
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    },

    // getChildCatalog: async () => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             let catalog = "";
    //             catalog = await db.Catalogs.findAll({
    //                 where: { parent_id: { [Op.not]: null } },
    //             });
    //             resolve(catalog);
    //         } catch (e) {
    //             console.log(e);
    //             // reject(e);
    //         }
    //     });
    // },

    updateCatalog: async (catalogdata) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!catalogdata.id) {
                    resolve({
                        errCode: 2,
                        errMessage: "Missing parameters",
                    });
                }

                let catalog = await db.Categories.update(
                    {
                        name: catalogdata.name,
                        rootcategory_id: catalogdata.rootcategory_id,
                        priority: catalogdata.priority,
                    },
                    {
                        where: { id: catalogdata.id },
                    }
                );

                console.log(catalog);
                resolve({
                    errCode: 0,
                    errMessage: "Oke",
                });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

    deleteRoot: async (rootId) => {
        try {
            return new Promise(async (resolve, reject) => {
                const root = await db.RootCategories.findOne({
                    where: { id: rootId },
                });

                const childs = await db.Categories.findAll({
                    where: { rootcategory_id: rootId },
                });
                console.log(root, childs);
                if (!root) {
                    resolve({
                        errCode: 2,
                        errMessage: "Catalog is not exist",
                    });
                }

                await db.Categories.destroy({
                    where: { rootcategory_id: rootId },
                });

                await db.RootCategories.destroy({
                    where: { id: rootId },
                });
                resolve({
                    errCode: 0,
                    errMessage: "Oke",
                });
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    },
};

module.exports = categoryService;
