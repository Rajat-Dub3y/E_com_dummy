import asynchandler from "../middleware/asynchandler.js";
import Product from "../models/product_model.js"
import { ApiError } from "../utils/Apierror.js";


const addproduct=asynchandler(async(req,res)=>{
    try{
        const{name,description,price,category,quantity,brand,image}=req.fields;
        
        switch(true){
            case !name:
                return res.json({error:"Name is required"})
            case !description:
                return res.json({error:"description is required"})
            case !price:
                return res.json({error:"price is required"})
            case !category:
                return res.json({error:"category is required"})
            case !quantity:
                return res.json({error:"quantity is required"})
            case !brand:
                return res.json({error:"brand is required"}) 
            case !image:
            return res.json({error:"image is required"})  
        }
        const product =new Product({...req.fields})
        await product.save()
        res.json(product)
    }catch(error){
        console.log(error)
        res.status(400).json(error.message)
    }
})

const updateproduct=asynchandler(async(req,res)=>{
    try{
        const{name,description,price,category,quantity,brand,image}=req.fields;
        switch(true){
            case !name:
                return res.json({error:"Name is required"})
            case !description:
                return res.json({error:"description is required"})
            case !price:
                return res.json({error:"price is required"})
            case !category:
                return res.json({error:"category is required"})
            case !quantity:
                return res.json({error:"quantity is required"})
            case !brand:
                return res.json({error:"brand is required"}) 
            case !image:
            return res.json({error:"image is required"})  
        }

        const product=await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})
        await product.save()
        res.json(product)
    }catch(error){
        console.log(error.message)
        throw new ApiError("400","can not updaate")
    }
})

const removeProduct=asynchandler(async(req,res)=>{
    try{
        const productId=req.params.id
        const result=await Product.findByIdAndDelete(productId)
        return res.status(200).json("deleted")
    }catch(error){
        console.log(error.message)
        throw new ApiError(400,"Can't remove")
    }
})

const fetchProduct=asynchandler(async(req,res)=>{
    try{
        const pageSize=6
        const keyword=req.query.keyword?{name:{$regex:req.query.keyword,$options:"i"}}:{};
        const count=await Product.countDocuments({...keyword})
        const products=await Product.find({...keyword}).limit(pageSize)

        res.json({products,page:1,pages:Math.ceil(count/pageSize),hasMore:false})
    }catch(error){
        console.log(error)
        res.status(400).json("Can't fetch")
    }
})

const fetchOne=asynchandler(async(req,res)=>{
    try{
        const productId=req.params.id
        const product=await Product.findById(productId)
        if(!product){
            res.status(404).json("product not found")
        }
        res.json(product)
    }catch(error){
        console.log(error)
        res.status(400).json("Can't find")
    }
})


const getAll=asynchandler(async(req,res)=>{
    try{
        const products=await Product.find({}).populate("category").limit(12).sort({createdAt:-1})
        res.json(products)
    }catch(error){
        console.log(error)
        res.status(400).json("Can't fetch products")
    }
})

const addReview=asynchandler(async(req,res)=>{
    try{
        const {rating,comment}=req.body
        const product=await Product.findById(req.params.id)
        if (!product){
            res.status(404).json("Product not found")
        }
        const alreadyReviewed=await product.reviews.find(r=>r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            return res.status(400).json("Already reviewed by user")
        }

        const review={
            name:req.user.username,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review)
        product.numReviews=product.reviews.length

        product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length

        await product.save()
        res.status(201).json({message:"Review added"});


    }catch(error){
        console.log(error)
        res.status(400).json("Can't add review")
    }
})

const fetchTopProduct=asynchandler(async(req,res)=>{
    try{
        const products=await Product.find({}).sort({rating:-1}).limit(4)
        res.json(products)
    }catch(error){
        console.log(error)
        res.status(400).json(error.message)
    }
})


const fetchNewProduct=asynchandler(async(req,res)=>{
    try{
        const products=await Product.find().sort({_id:-1}).limit(5)
        res.json(products)
    }catch(error){
        console.log(error)
        res.status(400).json(error.message)
    }
})

const filterProducts=asynchandler(async(req,res)=>{
    try {
        const {checked,radio}=req.body;

        let args={};
        if(checked.length>0) args.category=checked;
        if (radio.length) args.price={$get:radio[0],$lte:radio[1]};

        const products=await Product.find(args);
        res.json(products)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Server Error"})
    }
})

export {addproduct,updateproduct,removeProduct,fetchProduct,fetchOne,getAll,addReview,fetchTopProduct,fetchNewProduct,filterProducts}