import axios from "axios";
const salesAPI = {
    search: async (key) => {
        const res = await axios.get(
            "http://localhost:8888/api/search?name=" + key
        );
        return res;
    },
    addRoot: async (root) => {
        const res = await axios.post(
            "http://localhost:8888/api/create-new-root",
            root
        );
        return res;
    },
    getAllRoots: async () => {
        const res = await axios.get("http://localhost:8888/api/getAllRoots");
        return res;
    },
    addCatalog: async (catalog) => {
        const res = await axios.post(
            "http://localhost:8888/api/create-new-category",
            catalog
        );
        return res;
    },
    addChild: async (child) => {
        const res = await axios.post(
            "http://localhost:8888/api/create-new-child",
            child
        );
        return res;
    },
    getAllCatalogs: async () => {
        const res = await axios.get(
            "http://localhost:8888/api/getAllCategories"
        );
        return res;
    },
    getChildCatalogs: async () => {
        const res = await axios.get("http://localhost:8888/api/getAllChilds/");
        return res;
    },

    getAllProducts: async () => {
        const res = await axios.get(`http://localhost:8888/api/getAllProducts`);
        return res;
    },

    getAllPopular: async () => {
        const res = await axios.get("http://localhost:8888/api/getAllPopular");
        return res;
    },

    getProduct: async (productId) => {
        const res = await axios.get(
            `http://localhost:8888/api/getProduct/?id=` + productId
        );
        return res;
    },

    addProduct: async (product) => {
        const res = await axios.post(
            "http://localhost:8888/api/create-new-product",
            product
        );
        return res;
    },

    EditCatalog: async (catalog) => {
        const res = await axios.put(
            "http://localhost:8888/api/editchild",
            catalog
        );
        return res;
    },

    Editproduct: async (product) => {
        const res = await axios.post(
            "http://localhost:8888/api/editproduct",
            product
        );
        alert("Edit Product success!");
        return res;
    },
};

export default salesAPI;
