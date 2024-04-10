import axios from "axios"
import { productsFail, productsLoading, productsSuccess,productDetailsLoading,productDetailsSuccess,productDetailsFail } from "../reducers/products"

export const getAllProducts = () => async (dispatch) =>{
    dispatch(productsLoading());
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/products/latest`)
        dispatch(productsSuccess(response.data))
    } catch (error) {
        dispatch(productsFail(error.message))
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    dispatch(productDetailsLoading())
    try {
        const response = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
        dispatch(productDetailsSuccess(response.data))
    } catch (error) {
        dispatch(productDetailsFail(error.message))
    }
}