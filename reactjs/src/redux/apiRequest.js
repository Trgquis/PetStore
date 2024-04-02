import axios from "axios";
import { unwrapResult } from "@reduxjs/toolkit";
import { Login } from "../redux/AuthSlice";
import { Regist, addUserByAdmin, Logout } from "./AuthSlice";
import { getAllUsers, DeleteUser, EditUser } from "./UserSlice";
import { GetAllCart, GetOrder } from "./OrderSlice";
import {
    getProduct,
    SearchProduct,
    addnewCatalog,
    addnewProduct,
    EditCatalog,
    Deletecatalog,
    DeleteProduct,
    getChildCatalogs,
    getAllCatalogs,
    getAllProducts,
    EditProduct,
    addRootCategory,
    getAllRoots,
    addnewChild,
} from "./SaleSlice";
export const handleGetAllCarts = async (userId, dispatch) => {
    try {
        const getCarts = await dispatch(GetAllCart(userId));
        const allCarts = unwrapResult(getCarts);
        console.log("cartList", allCarts.data);
    } catch (e) {
        console.log(e);
    }
};
export const handleGetOrder = async (userId, dispatch) => {
    try {
        const getorder = await dispatch(GetOrder(userId));
        const order = unwrapResult(getorder);
        console.log("cartList", order.data);
    } catch (e) {
        console.log(e);
    }
};
export const handlegetAllRoots = async (dispatch) => {
    try {
        const getRoots = await dispatch(getAllRoots());
        const allRoots = unwrapResult(getRoots);
        console.log("catalogList", allRoots.data.roots);
    } catch (e) {
        console.log(e);
    }
};
export const handlegetAllCatalogs = async (dispatch) => {
    try {
        const getCatalogs = await dispatch(getAllCatalogs());
        const allCatalogs = unwrapResult(getCatalogs);
        console.log("catalogList", allCatalogs.data.catalogs);
    } catch (e) {
        console.log(e);
    }
};
export const handlegetAllChilds = async (dispatch) => {
    try {
        const getCatalogs = await dispatch(getChildCatalogs());
        const childCatalogs = unwrapResult(getCatalogs);
        console.log("childslist", childCatalogs.data.childs);
    } catch (e) {
        console.log(e);
    }
};

export const handleAddRoot = async (root, dispatch) => {
    try {
        const rs = await dispatch(addRootCategory(root));
        const addedRoot = unwrapResult(rs);
        console.log(addedRoot);
        alert("Add catalog success");
        handlegetAllRoots();
    } catch (e) {
        console.log(e);
    }
};
export const AddCatalog = async (catalog, dispatch, navigate) => {
    try {
        console.log(catalog);
        const res = await dispatch(addnewCatalog(catalog));
        const addedCatalog = unwrapResult(res);
        console.log("added", addedCatalog);
        handlegetAllCatalogs(dispatch);
        return addedCatalog.data.errCode;
        // navigate("/catalogsmanage");
    } catch (e) {
        alert(e);
    }
};
export const AddChild = async (child, dispatch, navigate) => {
    try {
        console.log(child);
        const res = await dispatch(addnewChild(child));
        const addedCatalog = unwrapResult(res);
        console.log("added", addedCatalog);
        handlegetAllChilds(dispatch)
        return addedCatalog.data.errCode;
        // navigate("/catalogsmanage");
    } catch (e) {
        alert(e);
    }
};
export const AddProduct = async (product, dispatch) => {
    try {
        const res = await dispatch(addnewProduct(product));
        const addedProduct = unwrapResult(res);
        console.log("added", addedProduct);
        alert("Add Product success");
        handlegetAllProducts(dispatch);
    } catch (e) {
        alert(e);
    }
};

export const handlegetAllProducts = async (dispatch) => {
    try {
        const getProducts = await dispatch(getAllProducts());
        const allProducts = unwrapResult(getProducts);
        console.log("ProductList", allProducts);
    } catch (e) {
        console.log(e);
    }
};

export const handlegetProduct = async (dispatch, productId) => {
    try {
        const getdetail = await dispatch(getProduct(productId));
        const detail = unwrapResult(getdetail);
        console.log(detail);
    } catch (e) {
        console.log(e);
    }
};

export const loginUser = async (user, dispatch) => {
    try {
        console.log(user);
        const actionResult = await dispatch(Login(user));
        const currentUser = unwrapResult(actionResult);
        console.log("logged in: ", currentUser);
        console.log("user accesstoken:", currentUser.data.accessToken);
    } catch (e) {
        console.log(e);
    }
};

export const loginSales = async (user, dispatch) => {
    try {
        const actionResult = await dispatch(Login(user));
        console.log(actionResult);
        const currentUser = unwrapResult(actionResult);
        console.log("logged in: ", currentUser);
        console.log("user accesstoken:", currentUser.data.accessToken);
        handlegetAllCatalogs(dispatch);
        handlegetAllProducts(dispatch);
    } catch (e) {
        console.log(e);
    }
};

export const loginAdmin = async (user, dispatch) => {
    try {
        console.log(user);
        const actionResult = await dispatch(Login(user));
        console.log(actionResult);
        const currentUser = unwrapResult(actionResult);
        console.log("logged in: ", currentUser);
        console.log("user accesstoken:", currentUser.data.accessToken);
    } catch (e) {
        console.log(e);
    }
};

export const handlegetAllUsers = async (dispatch) => {
    try {
        const getUsers = await dispatch(getAllUsers());
        const allUsers = unwrapResult(getUsers);
        console.log("userList", allUsers);
        return allUsers;
    } catch (e) {
        console.log(e);
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    try {
        const res = await dispatch(Regist(user));
        const regUser = unwrapResult(res);
        console.log("Regist", regUser);
        return regUser.data.errCode;
    } catch (e) {
        console.error(e);
    }
};

export const AddUser = async (user, dispatch, navigate) => {
    try {
        console.log(user);
        const res = await dispatch(addUserByAdmin(user));
        const addedUser = unwrapResult(res);
        console.log("added", addedUser);
        handlegetAllUsers(dispatch);
    } catch (e) {
        alert(e);
    }
};

export const logOut = async (accessToken, dispatch) => {
    try {
        console.log(accessToken);
        // await axiosJWT.post('/api/logout', id, {
        //     headers:{token: `Bearer ${accessToken}`}
        // })
        await dispatch(Logout(accessToken));
        // dispatch(logOutSuccess())
    } catch (e) {
        console.log(e);
    }
};

export const editUser = async (user, dispatch) => {
    try {
        console.log(user);
        const res = await dispatch(EditUser(user));
        console.log(res);
        const editUser = unwrapResult(res);
        console.log("edited", editUser);
        handlegetAllUsers(dispatch);
        return editUser;
    } catch (e) {
        console.log(e);
    }
};

export const editCatalog = async (catalog, dispatch) => {
    try {
        console.log(catalog);
        const res = await dispatch(EditCatalog(catalog));
        const editInfo = unwrapResult(res);
        console.log("edited", editInfo);
        handlegetAllCatalogs(dispatch);
        return editInfo;
    } catch (e) {
        console.log(e);
    }
};

export const editProduct = async (product, dispatch) => {
    try {
        console.log(product.get("id"));
        const res = await dispatch(EditProduct(product));
        const editInfo = unwrapResult(res);
        console.log("edited", editInfo);
        alert("edit product by admin success");
        handlegetAllProducts(dispatch);
    } catch (e) {
        console.log(e);
    }
};

export const searchProduct = async (key, dispatch) => {
    try {
        console.log(key);
        // const res = await axios.get("/api/search-product?name=" + key);
        // console.log(res);
        const res = await dispatch(SearchProduct(key));
        console.log(res);
        const info = unwrapResult(res);
        console.log("rs", info);
    } catch (e) {
        console.log(e);
    }
};

export const deleteCatalog = async (dispatch, id) => {
    try {
        console.log(id);
        await axios.delete("http://localhost:8888/api/deletecategory?id=" + id);
        const res = await dispatch(Deletecatalog(id));

        const deleted = unwrapResult(res);
        handlegetAllCatalogs(dispatch);
        return deleted;
    } catch (e) {
        console.log(e);
    }
};

export const deleteProduct = async (dispatch, id) => {
    try {
        console.log(id);
        await axios.delete("http://localhost:8081/api/delete-product?id=" + id);
        const res = await dispatch(DeleteProduct(id));

        const deleted = unwrapResult(res);
        handlegetAllProducts(dispatch);

        console.log("deleted", deleted);
    } catch (e) {
        console.log(e);
    }
};

export const deleteUser = async (dispatch, id) => {
    try {
        console.log(id);
        await axios.delete("http://localhost:8888/api/deleteuser?id=" + id);
        const res = await dispatch(DeleteUser(id));
        const deleted = unwrapResult(res);
        handlegetAllUsers(dispatch);
        console.log(deleted);
        return deleted;
    } catch (e) {
        console.log(e);
    }
};
