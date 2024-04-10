import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    loading:true,
    user:{},
    error:null
}
export const usersSlice = createSlice({
    name:"usersSlice",
    initialState,
    reducers:{
        userLoginReq:(state) =>{
            state.loading = true,
            state.error = null
        },
        userLoginSuccess:(state,action) =>{
            state.loading = false,
            state.user = action.payload,
            state.error = null
        },
        userLoginFail:(state,action) =>{
            state.loading = false,
            state.error = action.payload;
        }
    }
});

export const {userLoginReq,userLoginSuccess,userLoginFail} = usersSlice.actions