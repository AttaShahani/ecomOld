import crypto from "crypto";
import { tryCatch } from "../middlewares/tryCatch.js";
import { User } from "../models/user.models.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
// Register new user 
export const registerUser = tryCatch(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
    avatar:{public_id:"sampleid",url:"sampleurl"}
    })
    sendToken(user,201,res)
})
export const logingUser = tryCatch(async(req,res,next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Pease Enter email and password",400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("User not Found",404))
    }
    const correctPassword = await user.comparePassword(password);
    if(!correctPassword){
        return next(new ErrorHandler("Incorrect password",401))
    }
    sendToken(user,200,res);
})

export const logout = tryCatch(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"User Logged Out Successfully"
    })
})

export const forgotPassword = tryCatch(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found",404))
    }

    const resetToken = user.genPassResetToken();
    await user.save()

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your ECommerce app password reset token is:\n\n${resetPasswordUrl}\n\nIf you've not requested for it, please ignore.`

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;

        await user.save();
        return next(new ErrorHandler(error.message,500))
    }
})

export const resetPassword = tryCatch(async (req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({resetPasswordToken,resetPasswordTokenExpire:{$gt:Date.now()}})
    if(!user){
        return next(new ErrorHandler("Password reset token is invalid or has been expired!",400))
    }
    if(req.body.password!== req.body.confirmPassword){
        return next(new ErrorHandler("Password fields are not matching",400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save();
    sendToken(user,200,res)
})

// get my details 
export const myProfile = tryCatch(async (req,res,next)=>{
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

// Update User Password
export const updatePassword = tryCatch(async (req,res,next)=>{
    const {oldPassword,newPassword,confirmPassword} = req.body
    const user = await User.findById(req.user.id).select("+password")
    const correctPassword = await user.comparePassword(oldPassword)
    if(!correctPassword){
        return next(new ErrorHandler("Incorrect Old Password",400))
    }
    if(newPassword!==confirmPassword){
        return next(new ErrorHandler("Passwords do not match",400))
    }
    user.password = newPassword;
    await user.save();
    sendToken(user,200,res)
})
// Update User Profile
export const updateProfile = tryCatch(async (req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        // avatar 
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{new:true})
    res.status(200).json({
        success:true,
        user
    })
})

//*Admin Routes
// Get All Users 
export const getAllUsers = tryCatch(async (req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})
// Get Single User
export const userDetails = tryCatch(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,404))
    }
    res.status(200).json({
        success:true,
        user
    })
})

// Update User Role 
export const updateUserRole = tryCatch(async (req,res,next)=>{
    const newUserData = {
        role:req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{new:true})
    res.status(200).json({
        success:true,
        user
    })
})
// Delete User Profile
export const deleteUserProfile = tryCatch(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,404))
    }
    await user.deleteOne()
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
    })
})