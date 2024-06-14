import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllCart = createAsyncThunk("GetAllCart", async (userId) => {
    const res = await axios.get(
        `http://localhost:8888/api/getAllCart?userId=` + userId,
        {
            withCredentials: true,
        }
    );
    return res;
});
export const GetOrders = createAsyncThunk("GetOrders", async () => {
    const res = await axios.get(`http://localhost:8888/api/handleGetAllOrders`);
    return res;
});
export const getUserOrders = createAsyncThunk(
    "GetUserOrders",
    async (userId) => {
        const res = await axios.get(
            `http://localhost:8888/api/handleGetUserOrders?userId=` + userId
        );
        return res;
    }
);
const OrderSlice = createSlice({
    name: "order",
    initialState: {
        allCarts: null,
        Order: null,
        userOrders: null,
        isFetching: false,
        error: false,
    },
    extraReducers: {
        [GetAllCart.pending]: (state) => {
            state.isFetching = true;
        },
        [GetAllCart.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.allCarts = action.payload;
            state.error = false;
        },
        [GetAllCart.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        [GetOrders.pending]: (state) => {
            state.isFetching = true;
        },
        [GetOrders.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.Order = action.payload;
            state.error = false;
        },
        [GetOrders.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        [getUserOrders.pending]: (state) => {
            state.isFetching = true;
        },
        [getUserOrders.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.userOrders = action.payload;
            state.error = false;
        },
        [getUserOrders.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

const { reducer: OrderReducer } = OrderSlice;
export default OrderReducer;
