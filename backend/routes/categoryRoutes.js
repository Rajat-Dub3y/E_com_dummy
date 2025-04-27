import express from "express"
import { authenticate,adminCheck } from "../middleware/authMiddleware.js"
import { createCategory,updateCat,deleteCat,listCat,readCat } from "../controllers/category_Controllers.js"

const router =express.Router()

router.route("/").post(authenticate,createCategory)
router.route(`/:categoryId`).put(authenticate,adminCheck,updateCat).delete(authenticate,adminCheck,deleteCat)
router.route("/categories").get(listCat)
router.route(":id").get(readCat)

export default router