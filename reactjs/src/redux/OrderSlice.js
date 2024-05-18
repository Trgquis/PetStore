import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetAllCart = createAsyncThunk("GetAllCart", async (userId) => {
    const res = await axios.get(
        `https://petstore-backend-pgof.onrender.com/api/getAllCart?userId=` +
            userId,
        {
            withCredentials: true,
        }
    );
    console.log(res);
    return res;
});
export const GetOrders = createAsyncThunk("GetOrders", async () => {
    const res = await axios.get(
        `https://petstore-backend-pgof.onrender.com/api/handleGetAllOrders`
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
        [GetOrders.pending]: (state) => {
            state.isFetching = true;
        },
        [GetOrders.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isFetching = false;
            state.Order = action.payload;
            state.error = false;
        },
        [GetOrders.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

const { reducer: OrderReducer } = OrderSlice;
export default OrderReducer;
