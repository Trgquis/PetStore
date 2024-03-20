import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import AuthReducer from "./AuthSlice";
import SalesReducer from "./SaleSlice";
import OrderReducer from "./OrderSlice";
import UsersReducer from "./UserSlice";
const authPersistConfig = {
    key: "auth",
    version: 1,
    storage: AsyncStorage,
    whitelist: ["Login"],
};

const orderPersistConfig = {
    key: "order",
    version: 1,
    storage: AsyncStorage,
    whitelist: ["GetAllCart"],
};

const rootReducerWithPersist = combineReducers({
    auth: persistReducer(authPersistConfig, AuthReducer),
    order: persistReducer(orderPersistConfig, OrderReducer),
    users: UsersReducer,
    sales: SalesReducer,
    // Add other reducers if any
});

const persistedReducer = persistReducer(
    {
        key: "root",
        version: 1,
        storage: AsyncStorage,
        whitelist: ["auth", "order"],
    },
    rootReducerWithPersist
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

export const persistor = persistStore(store);
