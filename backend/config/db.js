import mongoose from "mongoose";

export const connectDB= async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/');
        console.log("successfully connected")
    }catch(error){
        console.log(`Error:${error.message}`)
        console.log("connect failed")
        process.exit(1)
    }
}