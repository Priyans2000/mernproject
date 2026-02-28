import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/users/userSlices";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;