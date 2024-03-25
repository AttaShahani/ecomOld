import ErrorHandler from "../utils/errorHandler.js";
import { tryCatch } from "./tryCatch.js"
import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js"
export const isLoggedIn = tryCatch( async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }
    const decodedData = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.id)
    next();
})

export const authRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role ${req.user.role} can't access this resource`,403))
        }
        next()
    }
}