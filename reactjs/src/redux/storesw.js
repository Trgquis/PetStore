import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import rootReducer from "./yourRootReducer"; // Thay thế 'yourRootReducer' bằng tên file rootReducer của bạn

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth", "order"], // Add your whitelist here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
