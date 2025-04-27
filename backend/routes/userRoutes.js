import express from "express";
import {createUser,loginUser,logOut,getAlluser,getporfile,updateprofile,deleteuser,getUserbyid,updateuserbyid} from "../controllers/user_controllers.js"
import { authenticate,adminCheck } from "../middleware/authMiddleware.js";


const router=express.Router();


router.route('/').post(createUser).get(authenticate ,adminCheck, getAlluser);
router.route('/auth').post(loginUser)
router.route('/loginOut').post(logOut)
router.route('/profile').get(authenticate,getporfile).put(authenticate,updateprofile)
router.route("/:id").delete(authenticate,adminCheck,deleteuser).get(authenticate,adminCheck,getUserbyid).put(authenticate,adminCheck,updateuserbyid)

export default router;