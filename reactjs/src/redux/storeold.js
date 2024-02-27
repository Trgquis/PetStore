import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import thunk from "redux-thunk";

// import UserReducer from "./UserSlice";
// import SalesReducer from "./SaleSlice";
// import OrderReducer from "./OrderSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const authPersistConfig = {
    key: "auth",
    version: 1,
    storage: AsyncStorage,
    whitelist: ["Login"], // Add your whitelist here for the "auth" slice, e.g., ["someReducerKey"]
};

// const cartPersistConfig = {
//     key: "order",
//     version: 1,
//     storage: AsyncStorage,
//     whitelist: ["GetAllCart"], // Add your whitelist here for the "cart" slice, e.g., ["someReducerKey"]
// };

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, AuthReducer),
    // sales: SalesReducer,
    // users: UserReducer,
    // order: persistReducer(cartPersistConfig, OrderReducer),
});

const persistedReducer = persistReducer(
    {
        key: "root",
        version: 1,
        storage: AsyncStorage,
        whitelist: ["auth", "order"],
    },
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

export let persistor = persistStore(store);
