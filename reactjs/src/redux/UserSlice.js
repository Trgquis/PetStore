import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getallusers", async () => {
    const res = await userAPI.getAllUsers();
    return res;
});

export const EditUser = createAsyncThunk("editUser", async (user) => {
    const res = await userAPI.EditUser(user);
    return res;
});

export const DeleteUser = createAsyncThunk("deleteUser", async (userId) => {
    return true;
});


const UserSlice = createSlice({
    name: "users",
    initialState: {
        isFetching: false,
        error: false,
        allUsers: null,
        user: null,
    },
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.isFetching = true;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.allUsers = action.payload;
            state.error = false;
        },
        [getAllUsers.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [EditUser.pending]: (state) => {
            state.isFetching = true;
        },
        [EditUser.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.error = false;
        },
        [EditUser.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },

        // [DeleteUser.pending]: (state) => {
        //     state.users.isFetching = true;
        // },
        // [DeleteUser.fulfilled]: (state, action) => {
        //     state.users.isFetching = false;
        //     // state.users.allUsers = action.payload
        //     state.users.error = false;
        // },
        // [DeleteUser.rejected]: (state, action) => {
        //     state.users.isFetching = false;
        //     state.users.error = true;
        // },
    },
});

const { reducer: UsersReducer } = UserSlice;
export default UsersReducer;
