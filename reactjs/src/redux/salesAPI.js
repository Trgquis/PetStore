import axios from "axios";

const salesAPI = {
    search: async (key) => {
        const res = await axios.get(
            "https://petstore-backend-pgof.onrender.com/api/search?name=" + key
        );
        console.log(res);
        return res;
    },
    addRoot: async (root) => {
        const res = await axios.post(
            "https://petstore-backend-pgof.onrender.com/api/create-new-root",
            root
        );
        return res;
    },
    getAllRoots: async () => {
        const res = await axios.get(
            "https://petstore-backend-pgof.onrender.com/api/getAllRoots"
        );
        return res;
    },
    addCatalog: async (catalog) => {
        const res = await axios.post(
            "https://petstore-backend-pgof.onrender.com/api/create-new-category",
            catalog
        );
        return res;
    },
    addChild: async (child) => {
        const res = await axios.post(
            "https://petstore-backend-pgof.onrender.com/api/create-new-child",
            child
        );
        return res;
    },
    getAllCatalogs: async () => {
        const res = await axios.get(
            "https://petstore-backend-pgof.onrender.com/api/getAllCategories"
        );
        return res;
    },
    getChildCatalogs: async () => {
        const res = await axios.get(
            "https://petstore-backend-pgof.onrender.com/api/getAllChilds/"
        );
        return res;
    },

    getAllProducts: async () => {
        const res = await axios.get(
            "https://petstore-backend-pgof.onrender.com/api/getAllProducts"
        );
        return res;
    },

    getAllPopular: async () => {
        const res = await axios.get(
            "https://petstore-backend-pgof.onrender.com/api/getAllPopular"
        );
        return res;
    },

    getProduct: async (productId) => {
        console.log(productId);
        const res = await axios.get(
            "https://petstore-backend-pgof.onrender.com/api/getProduct/?id=" +
                productId
        );
        console.log(res);
        return res;
    },

    addProduct: async (product) => {
        console.log(product);
        const res = await axios.post(
            "https://petstore-backend-pgof.onrender.com/api/create-new-product",
            product
        );
        return res;
    },

    EditCatalog: async (catalog) => {
        const res = await axios.put(
            "https://petstore-backend-pgof.onrender.com/api/editchild",
            catalog
        );
        console.log(res);
        return res;
    },

    Editproduct: async (product) => {
        const res = await axios.post(
            "https://petstore-backend-pgof.onrender.com/api/editproduct",
            product
        );
        console.log(res);
        alert("Edit Product success!");
        return res;
    },
};

export default salesAPI;
