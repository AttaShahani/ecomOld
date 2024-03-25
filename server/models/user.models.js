import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import crypto from "crypto"
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name Must be atleast 4 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please Enter You Email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password must be atleast 8 characters long"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
  },
  {
    timestamps: true,
  }
);
// Hashing Password for new and updated Users
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// Creating Token for auto login 

userSchema.methods.genToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
  })
}

// Comparing Password for login 

userSchema.methods.comparePassword = async function(givenPassword){
  return await bcrypt.compare(givenPassword,this.password)
}

// password reset token generation 
userSchema.methods.genPassResetToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetPasswordTokenExpire = Date.now() + 15*60*1000;
  return resetToken;
}
export const User = mongoose.model("User", userSchema);
