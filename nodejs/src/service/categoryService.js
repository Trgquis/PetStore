const db = require("../model/server");
const { Op, where } = require("sequelize");

const categoryService = {
    dragpriority: async (movedCategoryId, destinationIndex, sourceId) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Lấy thông tin của phần tử được kéo
                const movedCategory = await db.Categories.findOne({
                    where: {
                        id: parseInt(movedCategoryId),
                    },
                });

                // Lấy thông tin của phần tử ở vị trí đích
                const destinationCategory = await db.Categories.findOne({
                    where: {
                        priority: parseInt(destinationIndex),
                    },
                });

                // Cập nhật priority của phần tử được kéo
                await db.Categories.update(
                    { priority: parseInt(destinationIndex) },
                    { where: { id: parseInt(movedCategoryId) } }
                );

                // Cập nhật priority của phần tử ở vị trí đích
                await db.Categories.update(
                    { priority: parseInt(movedCategory.priority) },
                    { where: { id: parseInt(destinationCategory.id) } }
                );

                // Lấy danh sách danh mục đã cập nhật để gửi về frontend
                const categories = await db.Categories.findAll({
                    order: [["priority", "ASC"]],
                });
                resolve({
                    errCode: 0,
                    errMessage: "oke",
                    categories,
                });
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    },

    dragrootpriority: async (movedCategoryId, destinationIndex, sourceId) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Lấy thông tin của phần tử được kéo
                const movedCategory = await db.RootCategories.findOne({
                    where: {
                        id: parseInt(movedCategoryId),
                    },
                });

                // Lấy thông tin của phần tử ở vị trí đích
                const destinationCategory = await db.RootCategories.findOne({
                    where: {
                        priority: parseInt(destinationIndex),
                    },
                });

                // Cập nhật priority của phần tử được kéo
                await db.RootCategories.update(
                    { priority: parseInt(destinationIndex) },
                    { where: { id: parseInt(movedCategoryId) } }
                );

                // Cập nhật priority của phần tử ở vị trí đích
                await db.RootCategories.update(
                    { priority: parseInt(movedCategory.priority) },
                    { where: { id: parseInt(destinationCategory.id) } }
                );

                // Lấy danh sách danh mục đã cập nhật để gửi về frontend
                const categories = await db.RootCategories.findAll({
                    order: [["priority", "ASC"]],
                });
                resolve({
                    errCode: 0,
                    errMessage: "oke",
                    categories,
                });
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    },

    dragchildpriority: async (movedCategoryId, destinationIndex, sourceId) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Lấy thông tin của phần tử được kéo
                const movedCategory = await db.ChildCategories.findOne({
                    where: {
                        id: parseInt(movedCategoryId),
                    },
                });

                // Lấy thông tin của phần tử ở vị trí đích
                const destinationCategory = await db.ChildCategories.findOne({
                    where: {
                        priority: parseInt(destinationIndex),
                    },
                });

                // Cập nhật priority của phần tử được kéo
                await db.ChildCategories.update(
                    { priority: parseInt(destinationIndex) },
                    { where: { id: parseInt(movedCategoryId) } }
                );

                // Cập nhật priority của phần tử ở vị trí đích
                await db.ChildCategories.update(
                    { priority: parseInt(movedCategory.priority) },
                    { where: { id: parseInt(destinationCategory.id) } }
                );

                // Lấy danh sách danh mục đã cập nhật để gửi về frontend
                const categories = await db.ChildCategories.findAll({
                    order: [["priority", "ASC"]],
                });
                resolve({
                    errCode: 0,
                    errMessage: "oke",
                    categories,
                });
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    },
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
                        rootcategory_id: catalogInfo.rootcategory_id,
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

    checkChild: async (childInfo) => {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(catalogInfo)
                let child = await db.ChildCategories.findOne({
                    where: {
                        name: childInfo.name,
                        parent_id: childInfo.parent_id,
                    },
                });

                if (child) {
                    console.log(child);
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
                    const maxrootpriority = await db.RootCategories.max(
                        "priority"
                    );
                    await db.RootCategories.create({
                        name: data.name,
                        priority: maxrootpriority + 1,
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
                    const maxpriority = await db.Categories.max("priority");
                    await db.Categories.create({
                        name: data.name,
                        rootcategory_id: data.rootcategory_id,
                        priority: maxpriority + 1,
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

    createNewChild: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                // Check thông tin về tên danh mục vị trí sắp xếp
                let inspect = await categoryService.checkChild(data);
                // let secondInspect = await checkParentandSort(data.parent_id, data.sort_order)
                if (inspect === true) {
                    resolve({
                        errCode: 1,
                        errMessage: "Catalog is existed!",
                    });
                } else {
                    const maxpriority = await db.ChildCategories.max(
                        "priority"
                    );
                    await db.ChildCategories.create({
                        name: data.name,
                        parent_id: data.parent_id,
                        priority: maxpriority + 1,
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

    editChild: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const childId = data.id;
                const newRootName = data.name;
                const child = await db.ChildCategories.update(
                    {
                        name: newRootName,
                    },
                    {
                        where: {
                            id: childId,
                        },
                    }
                );
                console.log(child);
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

    getAllRoot: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let roots = "";
                roots = await db.RootCategories.findAll({
                    attributes: {
                        raw: true,
                    },
                    order: [["priority", "ASC"]], // Sắp xếp theo priority tăng dần
                });
                let count = await db.RootCategories.count({});
                let result = { roots, count };
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    },

    getCatalog: async (findId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const catalog = await db.Categories.findOne({
                    where: {
                        id: findId,
                    },
                });
                console.log(catalog);
                resolve({ catalog });
            } catch (e) {
                reject(e);
            }
        });
    },

    getChild: async (findId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const child = await db.ChildCategories.findOne({
                    where: {
                        id: findId,
                    },
                });
                console.log(child);
                resolve({ child });
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
                    order: [["priority", "ASC"]], // Sắp xếp theo priority tăng dần
                });
                let count = await db.Categories.count({});
                let result = { catalogs, count };
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    },

    getAllChilds: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                let childs = "";
                childs = await db.ChildCategories.findAll();
                let count = await db.ChildCategories.count({});

                resolve({ childs, count });
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    },

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
                // Tìm tất cả các cấp 2 dựa trên rootId
                const categories = await db.Categories.findAll({
                    where: { rootcategory_id: rootId },
                });
                console.log(categories);
                // Duyệt qua từng cấp 2 và xóa tất cả các cấp 3 của nó
                for (let i = 0; i < categories.length; i++) {
                    const categoryId = categories[i].id;
                    console.log(categoryId);
                    // Xóa tất cả các   cấp 3 của cấp 2 hiện tại
                    await db.ChildCategories.destroy({
                        where: { parent_id: parseInt(categoryId) },
                    });
                }

                // Sau khi xóa tất cả cấp 3, tiếp tục xóa tất cả cấp 2
                await db.Categories.destroy({
                    where: { rootcategory_id: rootId },
                });

                // Cuối cùng, xóa root category (cấp 1)
                await db.RootCategories.destroy({
                    where: { id: rootId },
                });

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    },

    deleteCategory: async (id) => {
        try {
            return new Promise(async (resolve, reject) => {
                const category = await db.Categories.findOne({
                    where: { id: id },
                });

                if (!category) {
                    resolve({
                        errCode: 2,
                        errMessage: "Catalog is not exist",
                    });
                }
                await db.ChildCategories.destroy({
                    where: { parent_id: id },
                });
                await db.Categories.destroy({
                    where: { id: id },
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

    deleteChild: async (id) => {
        try {
            return new Promise(async (resolve, reject) => {
                const child = await db.ChildCategories.findOne({
                    where: { id: id },
                });

                if (!child) {
                    resolve({
                        errCode: 2,
                        errMessage: "Catalog is not exist",
                    });
                }

                await db.ChildCategories.destroy({
                    where: { id: id },
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
