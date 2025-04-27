import jwt, { decode } from "jsonwebtoken"
import User from "../models/user_models.js"
import asynchandler from "./asynchandler.js"
import { ApiError } from "../utils/Apierror.js";

const authenticate=asynchandler(async(req,res,next)=>{
    let token;
    token=req.cookies.jwt
    if (token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password");
            next()
        }catch(error){
            throw new ApiError(401,"Not aauthorised")
        }
    }else{
        throw new ApiError(401,"No token found")
    }
});

const adminCheck=asynchandler(async(req,res,next)=>{
    if (req.user && req.user.isAdmin){
        next()
    }else{
        if (req.user){
        throw new ApiError(401,"not a Admin")
        }else{
            throw new ApiError(401,"not a user")
        }
    }
})
export {authenticate,adminCheck}