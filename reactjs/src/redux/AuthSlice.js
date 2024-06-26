import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";

export const Login = createAsyncThunk("loginAll", async (user) => {
    const res = await userAPI.Login(user);
    return res;
});

export const Regist = createAsyncThunk("registUser", async (user) => {
    try {
        const res = await userAPI.Regist(user);
        return res;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error; // Rethrow the error to propagate it to the caller
    }
});

export const addUserByAdmin = createAsyncThunk(
    "addUserByadmin",
    async (user) => {
        const res = await userAPI.Regist(user);
        return res;
    }
);

export const Logout = createAsyncThunk("logoutUser", async (accessToken) => {
    await userAPI.Logout(accessToken);
    return true;
});

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    extraReducers: {
        [Login.pending]: (state) => {
            state.isFetching = true;
        },
        [Login.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        [Login.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [Regist.pending]: (state) => {
            state.isFetching = true;
        },
        [Regist.fulfilled]: (state, action) => {
            state.isFetching = false;
            // state.currentUser = action.payload
            state.error = false;
        },
        [Regist.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [addUserByAdmin.pending]: (state) => {
            state.isFetching = true;
        },
        [addUserByAdmin.fulfilled]: (state, action) => {
            state.error = false;
            state.isFetching = false;
        },
        [addUserByAdmin.rejected]: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        [Logout.pending]: (state) => {
            state.isFetching = true;
        },

        [Logout.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
        },

        [Logout.rejected]: (state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = true;
        },
    },
});

const { reducer: AuthReducer } = AuthSlice;
export default AuthReducer;
