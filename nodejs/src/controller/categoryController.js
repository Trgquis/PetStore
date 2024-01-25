const salerService = require("../services/salerService");

const categoryController = {
    handleCreateNewCatalog: async (req, res) => {
        console.log(req.body);
        let message = await salerService.createNewCatalog(req.body);
        console.log(message);
        return res.status(200).json(message);
    },
    handleGetAllCatalogs: async (req, res) => {
        let catalogs = await salerService.getAllCatalogs();
        console.log(catalogs);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            catalogs,
        });
    },
    handleGetChildCatalog: async (req, res) => {
        // let parentid = await req.query.id;
        // console.log(parentid)
        // if(!parentid) {
        //     return res.status(400).json({
        //         errCode: 1,
        //         errMessage: 'Missing required parameters',
        //         users: []
        //     })
        // }

        let catalogs = await salerService.getChildCatalog();
        console.log(catalogs);
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            catalogs,
        });
    },
    handleEditCatalog: async (req, res) => {
        let catalog = req.body;
        console.log(catalog);
        let message = await salerService.updateCatalog(catalog);
        return res.status(200).json(message);
    },
    handleDeleteCatalog: async (req, res) => {
        const id = req.query.id;
        console.log(id);
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing Parameters",
            });
        }
        // console.log(req.body.id)
        let message = await salerService.deleteCatalog(id);
        console.log(message);
        return res.status(200).json(message);
    },
};

module.exports = categoryController;
