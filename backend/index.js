import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import categoryRoutes from "./routes/categoryRoutes.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoute.js"

const port=process.env.PORT || 5000

connectDB();

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes )
app.use("/api/category",categoryRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api/order",orderRoutes)
app.get("/api/config/paypal",(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})


app.listen(port,()=>console.log(`sever running at ${port}`))