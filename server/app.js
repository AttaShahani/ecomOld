import express from 'express'
export const app = express();
import { handleError } from './middlewares/handleError.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from "cors"
// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors())
// importing routes 
import productRoutes from "./routes/products.routes.js"
import userRoutes from "./routes/users.routes.js"
import orderRoutes from "./routes/order.routes.js"
app.use("/api/v1",productRoutes)
app.use("/api/v1",userRoutes)
app.use("/api/v1",orderRoutes)

// Error Middleware 
app.use(handleError)