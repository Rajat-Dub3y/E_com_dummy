import express from "express";
import formidable from "express-formidable";
import {authenticate,adminCheck} from "../middleware/authMiddleware.js"
import checkId from "../middleware/checkId.js";
import { addproduct,updateproduct,removeProduct,fetchProduct,fetchOne,getAll,addReview,fetchTopProduct,fetchNewProduct,filterProducts} from "../controllers/product_Controllers.js";


const router=express.Router()



router.route("/").get(authenticate,adminCheck,fetchProduct).post(authenticate,adminCheck,formidable(),addproduct)
router.route("/allproducts").get(authenticate,adminCheck,getAll)
router.get("/top",fetchTopProduct)
router.get('/new',fetchNewProduct)
router.route("/:id").get(authenticate,fetchOne).put(authenticate,adminCheck,formidable(),updateproduct).delete(authenticate,adminCheck,removeProduct)
router.route("/:id/reviews").post(authenticate,addReview).get()
router.route("/filtered-products").post(filterProducts)


export default router