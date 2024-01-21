import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import salesAPI from "./salesAPI";

export const getAllCatalogs = createAsyncThunk("getallcatalogs", async () => {
    const res = await salesAPI.getAllCatalogs();
    return res;
});

export const getChildCatalogs = createAsyncThunk(
    "getchildcatalogs",
    async () => {
        const res = await salesAPI.getChildCatalogs();
        return res;
    }
);

export const getAllProducts = createAsyncThunk("getallproducts", async () => {
    const res = await salesAPI.getAllProducts();
    return res;
});

export const getProduct = createAsyncThunk("getproduct", async (productId) => {
    const res = await salesAPI.getProduct(productId);
    return res;
});

export const addnewCatalog = createAsyncThunk("addCatalog", async (catalog) => {
    const res = await salesAPI.addCatalog(catalog);
    return res;
});

export const addnewProduct = createAsyncThunk("addProduct", async (product) => {
    const res = await salesAPI.addProduct(product);
    return res;
});

export const EditCatalog = createAsyncThunk("editcatalog", async (catalog) => {
    console.log(catalog);
    const res = await salesAPI.EditCatalog(catalog);
    console.log(res);
    return res;
});

export const EditProduct = createAsyncThunk("editproduct", async (product) => {
    const res = await salesAPI.Editproduct(product);
    console.log(res);
    return res;
});

export const SearchProduct = createAsyncThunk("search", async (keyword) => {
    const res = await salesAPI.search(keyword);
    return res;
});

export const Deletecatalog = createAsyncThunk(
    "deletecatalog",
    async (catalogId) => {
        console.log(catalogId);
        return true;
    }
);

export const DeleteProduct = createAsyncThunk(
    "deleteproduct",
    async (ProductId) => {
        console.log(ProductId);
        return true;
    }
);
const SaleSlice = createSlice({
    name: "sales",
    initialState: {
        isFetching: false,
        error: false,
        allProducts: null,
        ProductSearchInfo: null,
        allCatalogs: null,
        allChilds: null,
        ProductDetail: null,
        allItems: null,
    },
    extraReducers: {
        [getAllCatalogs.pending]: (state) => {
            state.isFetching = true;
        },
        [getAllCatalogs.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.allCatalogs = action.payload;
            state.error = false;
        },
        [getAllCatalogs.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [getChildCatalogs.pending]: (state) => {
            state.isFetching = true;
        },
        [getChildCatalogs.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.allChilds = action.payload;
            state.error = false;
        },
        [getChildCatalogs.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [getAllProducts.pending]: (state) => {
            state.isFetching = true;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.allProducts = action.payload;
            state.error = false;
        },
        [getAllProducts.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [SearchProduct.pending]: (state) => {
            state.isFetching = true;
        },
        [SearchProduct.fulfilled]: (state, action) => {
            state.isFetching = false;
            console.log(action.payload);
            state.ProductSearchInfo = action.payload;
            state.error = false;
        },
        [SearchProduct.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [getProduct.pending]: (state) => {
            state.isFetching = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.isFetching = false;
            console.log(action.payload);
            state.ProductDetail = action.payload;
            state.error = false;
        },
        [getProduct.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [addnewCatalog.pending]: (state) => {
            state.isFetching = true;
        },
        [addnewCatalog.fulfilled]: (state, action) => {
            state.error = false;
            state.isFetching = false;
        },
        [addnewCatalog.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [addnewProduct.pending]: (state) => {
            state.isFetching = true;
        },
        [addnewProduct.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.error = false;
            state.isFetching = false;
        },
        [addnewProduct.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [EditCatalog.pending]: (state) => {
            state.isFetching = true;
        },
        [EditCatalog.fulfilled]: (state, action) => {
            state.isFetching = false;
            console.log(action.payload);
            state.error = false;
        },
        [EditCatalog.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [EditProduct.pending]: (state) => {
            state.isFetching = true;
        },
        [EditProduct.fulfilled]: (state, action) => {
            state.isFetching = false;
            console.log(action.payload);
            state.error = false;
        },
        [EditProduct.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        // [Deletecatalog.pending]:(state) => {
        //     state.catalogs.isFetching = true
        // },
        // [Deletecatalog.fulfilled]:(state, action) => {
        //     state.catalogs.isFetching = false
        //     console.log(action.payload)
        //     // state.catalogs.allcatalogs = action.payload
        //     state.catalogs.error = false
        // },
        // [Deletecatalog.rejected]:(state) => {
        //     state.catalogs.isFetching = false
        //     state.catalogs.error = true
        // }
    },
});

const { reducer: SalesReducer } = SaleSlice;
export default SalesReducer;
