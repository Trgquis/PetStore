import axios from "axios";

const salesAPI = {
    search: async (key) => {
        const res = await axios.get(
            "http://localhost:8888/api/search-product?name=" + key
        );
        console.log(res);
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
            "http://localhost:8888/api/create-new-catalog",
            catalog
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
        const res = await axios.get(
            "http://localhost:8888/api/get-child-catalogs/"
        );
        return res;
    },
    getAllProducts: async () => {
        const res = await axios.get(
            "http://localhost:8888/api/get-all-products"
        );
        return res;
    },
    getProduct: async (productId) => {
        const res = await axios.get(
            "http://localhost:8888/api/get-product/?id=" + productId
        );
        console.log(res);
        return res;
    },

    addProduct: async (product) => {
        console.log(product);
        const res = await axios.post(
            "http://localhost:8888/api/create-new-product",
            product
        );
        return res;
    },

    EditCatalog: async (catalog) => {
        const res = await axios.put(
            "http://localhost:8888/api/edit-catalog",
            catalog
        );
        console.log(res);
        return res;
    },

    Editproduct: async (product) => {
        const res = await axios.put(
            "http://localhost:8888/api/edit-product",
            product
        );
        console.log(res);
        alert("Edit Product success!");
        return res;
    },
};

export default salesAPI;
