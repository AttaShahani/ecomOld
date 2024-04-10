import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading:true,
    products:[],
    product:{},
    error:null,
};

export const productSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        productsLoading:(state) =>{
            state.loading = true,
            state.error = null;
        },
        productsSuccess:(state,action) =>{
            state.loading = false,
            state.products = action.payload.products,
            state.error = null
        },
        productsFail:(state,action) =>{
            state.loading = false,
            state.error = action.payload
        },
        productDetailsLoading:(state) =>{
            state.loading = true,
            state.error = null
        },
        productDetailsSuccess:(state,action) => {
            state.loading = false,
            state.product = action.payload.product,
            state.error = null
        },
        productDetailsFail:(state,action) => {
            state.loading = false,
            state.error = action.payload
        },
    },
})

export const {productsLoading,productsSuccess,productsFail,productDetailsFail,productDetailsLoading,productDetailsSuccess} = productSlice.actions