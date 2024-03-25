import ErrorHandler from "../utils/errorHandler.js";

export const handleError = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    // Wrong MongoDB ID Error -- Cast Error
    if(err.name === "CastError"){
        const message = `Resource Not Found. Invalid ${err.path}`;
        err = new ErrorHandler(message,400)
    }
    // Duplicate key error 
    if(err.code === 11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} error.`
        err = new ErrorHandler(message,400)
    }

    // Invalid Json Web Token
    if(err.name === "JsonWebTokenError"){
        const message=`Json Web Token is invalid, try again`
        err = new ErrorHandler(message,400)
    }
    // Expired Json Web Token
    if(err.name === "JsonWebTokenError"){
        const message=`Json Web Token is expired, try again`
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        // stack:err.stack
    })
}