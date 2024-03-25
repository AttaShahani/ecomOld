import mongoose from "mongoose";

export const dbCon = ()=>{
    mongoose.connect(process.env.MONGO_URI).then((data)=>{
        console.log(`Database Connected Successfully to ${data.connection.host}`);
    })
}