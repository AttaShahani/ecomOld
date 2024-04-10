import {configureStore} from "@reduxjs/toolkit"
import { productSlice } from "./reducers/products";
import { usersSlice } from "./reducers/users";

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
    reducer:{
        [productSlice.name]:productSlice.reducer,
        [usersSlice.name]:usersSlice.reducer
    },
})