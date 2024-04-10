import axios from "axios";
import { userLoginFail, userLoginReq } from "../reducers/users";

export const loginUser = (email,password)=> async (dispatch)=>{
    dispatch(userLoginReq())
    try {
        const {data} = await axios.post(`http://localhost:4000/api/v1/login`,email,password,{"Content-Type":"Application/json"})
    } catch (error) {
        dispatch(userLoginFail(error.message))
    }
}