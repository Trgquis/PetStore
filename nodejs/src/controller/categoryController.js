const categoryService = require("../service/categoryService");

const categoryController = {
    handleDrag: async (req, res) => {
        const movedCategoryId = req.body.movedId;
        const destinationIndex = req.body.destinationIndex;
        const sourceId = req.body.sourceIndex;
        let message = await categoryService.dragpriority(
            movedCategoryId,
            destinationIndex,
            sourceId
        );
        // console.log(message);
        return res.status(200).json("oke");
    },
    handleDragRoot: async (req, res) => {
        const movedCategoryId = req.body.movedId;
        const destinationIndex = req.body.destinationIndex;
        const sourceId = req.body.sourceIndex;
        let message = await categoryService.dragrootpriority(
            movedCategoryId,
            destinationIndex,
            sourceId
        );
        // console.log(message);
        return res.status(200).json("oke");
    },
    handleDragChild: async (req, res) => {
        const movedCategoryId = req.body.movedId;
        const destinationIndex = req.body.destinationIndex;
        const sourceId = req.body.sourceIndex;
        let message = await categoryService.dragchildpriority(
            movedCategoryId,
            destinationIndex,
            sourceId
        );
        // console.log(message);
        return res.status(200).json("oke");
    },
    handleCreateNewRoot: async (req, res) => {
        // console.log(req.body);
        let message = await categoryService.createNewRoot(req.body);
        // console.log(message);
        return res.status(200).json(message);
    },
    handleEditRoot: async (req, res) => {
        // console.log(req.body);
        let message = await categoryService.editRoot(req.body);
        // console.log(message);
        return res.status(200).json(message);
    },
    handleDeleteRoot: async (req, res) => {
        const rootId = parseInt(req.query.id);
        // console.log(rootId);
        if (!rootId) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing Parameters",
            });
        }
        // // console.log(req.body.id)
        let message = await categoryService.deleteRoot(rootId);
        // console.log(message);
        return res.status(200).json(message);
    },
    handleCreateNewCatalog: async (req, res) => {
        // console.log(req.body);
        let message = await categoryService.createNewCatalog(req.body);
        // console.log(message);
        return res.status(200).json(message);
    },
    handleCreateNewChild: async (req, res) => {
        // console.log(req.body);
        let message = await categoryService.createNewChild(req.body);
        // console.log(message);
        return res.status(200).json(message);
    },
    handleGetAllRoots: async (req, res) => {
        let roots = await categoryService.getAllRoot();
        // console.log(roots);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            roots,
        });
    },
    handleGetCatalog: async (req, res) => {
        const findId = parseInt(req.query.id);
        let category = await categoryService.getCatalog(findId);
        // console.log(category);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            category,
        });
    },
    handleGetAllCatalogs: async (req, res) => {
        let catalogs = await categoryService.getAllCatalogs();
        // console.log(catalogs);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            catalogs,
        });
    },

    handleGetAllChilds: async (req, res) => {
        let childs = await categoryService.getAllChilds();
        // console.log(childs);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            childs,
        });
    },
    handleGetChild: async (req, res) => {
        const findId = parseInt(req.query.id);
        let child = await categoryService.getChild(findId);
        // console.log(child);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            child,
        });
    },
    handleEditChild: async (req, res) => {
        let child = req.body;
        // console.log(child);
        let message = await categoryService.editChild(child);
        return res.status(200).json(message);
    },
    handleDeleteChild: async (req, res) => {
        const id = req.query.id;
        // console.log(id);
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing Parameters",
            });
        }
        // // console.log(req.body.id)
        let message = await categoryService.deleteChild(id);
        // console.log(message);
        return res.status(200).json(message);
    },

    handleEditCatalog: async (req, res) => {
        let catalog = req.body;
        // console.log(catalog);
        let message = await categoryService.updateCatalog(catalog);
        return res.status(200).json(message);
    },

    handleDeleteCatalog: async (req, res) => {
        const id = req.query.id;
        // console.log(id);
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing Parameters",
            });
        }
        // // console.log(req.body.id)
        let message = await categoryService.deleteCategory(id);
        // console.log(message);
        return res.status(200).json(message);
    },
};

module.exports = categoryController;
