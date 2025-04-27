import Category  from "../models/category_models.js";
import asynchandler from "../middleware/asynchandler.js";
import { ApiError } from "../utils/Apierror.js";
const createCategory =asynchandler(async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name.trim()){
            return res.json({error:"Name is requried"})
        }
        const cat_exists=await Category.findOne({name})
        if (cat_exists){
            return res.json({error:"Category already exists"})
        }

        const category =await new Category({name}).save()
        res.json(category)

    }catch(error){
        throw new ApiError(400,error)
    }
})

const updateCat=asynchandler(async(req,res)=>{
    try{
        const {name}=req.body;
        const {categoryId}=req.params
        const category=await Category.findOne({_id:categoryId})
        if (!category){
            return res.status(404).json({error:"category not found"})
        }
        category.name=name
        const updatedCat=await category.save();
        res.json(updatedCat)
    }catch(error){
        res.status(400).json(error)
    }

})

const deleteCat=asynchandler(async(req,res)=>{
    try{
        console.log(req.params.categoryId)
        const remove=await Category.findByIdAndDelete(req.params.categoryId)
        res.json(remove)
    }catch(error){
        throw new ApiError(400,"can not delete")
    }
})

const listCat=asynchandler(async(req,res)=>{
    try{
        const all=await Category.find({})
        res.json(all)
    }catch(error){
        throw new ApiError("400","can not get categories")
    }
})

const readCat=asynchandler(async(req,res)=>{
    try{
        const category = await Category.findOne({_id:req.params.id})
        return res.json(category)
    }catch(error){
        throw ApiError(400,"can not get")
    }
})



export {createCategory,updateCat,deleteCat,listCat,readCat}