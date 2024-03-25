import {app} from './app.js'
import dotenv from 'dotenv'
import { dbCon } from './config/db.js'

dotenv.config({path:"server/config/config.env"})
// Handling Uncaught Exception 
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down due to Uncaught Exception`);
    process.exit(1)
})

dbCon()

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection 
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is Shutting Down Due To Unhandled Promise Rejection`);
    server.close();
    process.exit(1)
})