import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getallusers", async () => {
    const res = await userAPI.getAllUsers();
    return res;
});

export const EditUser = createAsyncThunk("editUser", async (user) => {
    console.log(user);
    const res = await userAPI.EditUser(user);
    return res;
});

export const DeleteUser = createAsyncThunk("deleteUser", async (userId) => {
    console.log(userId);
    return true;
});

const UserSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
    },
    extraReducers: {
        [getAllUsers.pending]: (state) => {
            state.users.isFetching = true;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.users.isFetching = false;
            console.log(action.payload);
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        [getAllUsers.rejected]: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        [EditUser.pending]: (state) => {
            state.users.isFetching = true;
        },
        [EditUser.fulfilled]: (state, action) => {
            state.users.isFetching = false;
            console.log(action.payload);
            state.users.error = false;
        },
        [EditUser.rejected]: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        [DeleteUser.pending]: (state) => {
            state.users.isFetching = true;
        },
        [DeleteUser.fulfilled]: (state, action) => {
            state.users.isFetching = false;
            console.log(action.payload);
            // state.users.allUsers = action.payload
            state.users.error = false;
        },
        [DeleteUser.rejected]: (state, action) => {
            console.log(action.payload);
            state.users.isFetching = false;
            state.users.error = true;
        },
    },
});

const { reducer: UserReducer } = UserSlice;
export default UserReducer;
