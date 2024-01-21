import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllCart = createAsyncThunk("GetAllCart", async (userId) => {
    const res = await axios.get(
        "http://localhost:8081/api/getAllCart?user_id=" + userId
    );
    console.log(res);
    return res;
});
export const GetOrder = createAsyncThunk("GetOrder", async (userId) => {
    const res = await axios.get(
        "http://localhost:8081/api/GetOrder?user_id=" + userId
    );
    console.log(res);
    return res;
});
const OrderSlice = createSlice({
    name: "order",
    initialState: {
        allCarts: null,
        Order: null,
        isFetching: false,
        error: false,
    },
    extraReducers: {
        [GetAllCart.pending]: (state) => {
            state.isFetching = true;
        },
        [GetAllCart.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isFetching = false;
            state.allCarts = action.payload;
            state.error = false;
        },
        [GetAllCart.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        [GetOrder.pending]: (state) => {
            state.isFetching = true;
        },
        [GetOrder.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isFetching = false;
            state.Order = action.payload;
            state.error = false;
        },
        [GetOrder.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

const { reducer: OrderReducer } = OrderSlice;
export default OrderReducer;
