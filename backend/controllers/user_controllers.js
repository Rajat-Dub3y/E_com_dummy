import User from "../models/user_models.js"
import asynchandler from "../middleware/asynchandler.js"
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createtoken.js"
const createUser=asynchandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username){
        throw new ApiError(400,"username is missing")
    }
    if(!email){
        throw new ApiError(400,"email is missing")
    }
    if(!password){
        throw new ApiError(400,"password is missing")
    }
    const userexists=await User.findOne({email})
    if(userexists){
        throw new ApiError(400,"user already exists")
    }
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=new User({username,email,password:hashedPassword})
    try{
        await newUser.save()
        createToken(res,newUser._id)

        return res.status(201).json(
            new ApiResponse(201, {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
            }, "User registered")
        );
    }catch(error){
        throw new ApiError(400,error.message)
    }
})

const loginUser=asynchandler(async(req,res)=>{
    
    const {email,password}=req.body;
    if(!email|| !password){
        throw new ApiError(400,"email and password required")
    } 
    const Userexists=await User.findOne({email})
    if (!Userexists){
        throw new ApiError(400,"User doesn't exists")
    }
    
    const isPass=await bcrypt.compare(password,Userexists.password)
    if (!isPass){
        throw new ApiError(400,"Incorrect password")
    }
    createToken(res,Userexists._id)
    res.status(201).json({
        id: Userexists._id,
        username: Userexists.username,
        isAdmin: Userexists.isAdmin
    })
    return ;
})

const logOut=asynchandler(async(req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json("loged out")
})

const getAlluser=asynchandler(async(req,res)=>{
    const users=await User.find()
    res.json(users)
})

const getporfile=asynchandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if (!user){
        throw new ApiError(400,"user not found")
    }
    res.json({_id:user._id,name:user.username,email:user.email,created:user.createdAt})
})

const updateprofile=asynchandler(async(req,res)=>{
    try{
        const user=await User.findById(req.user._id)
        if(!user){
            throw new ApiError(400,"user doesn't exists")
        }
        user.username=req.body.username || user.username;
        user.email=req.body.email || user.email
        if (req.body.password){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(req.body.password,salt) 
            user.password=req.body.password
        }
        const udpadateduser=await user.save()
        res.json({_id:user._id,name:user.username,email:user.email})
    }catch(error){
        throw new ApiError(400,"can't update")
    }
})
const deleteuser=asynchandler(async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        console.log(user)
        if (!user){
            throw new ApiError(400,"user not found")
        }
        if (user.isAdmin){
            throw new ApiError(400,"can not delete admin")
        }
        await User.deleteOne({_id:user.id})
        res.json({message:"user removed"})
    }catch(error){
        throw new ApiError(402,error)
    }

})

const getUserbyid=asynchandler(async(req,res)=>{
    const user=await User.findById(req.params._id).select("-password")
    if (!user){
        throw new ApiError(400,"user not found")
    }
    res.json(user)
})

const updateuserbyid=asynchandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        throw new ApiError(400,"user not found")
    }
    user.username=req.body.username || user.username;
    user.email=req.body.email || user.email
    user.isAdmin=Boolean(req.body.isAdmin)

    const updateduser=await user.save()

    res.json({_id:user._id,name:user.username,email:user.email,isAdmin:user.isAdmin})
})

export {createUser,loginUser,logOut,getAlluser,getporfile,updateprofile,deleteuser,getUserbyid,updateuserbyid};