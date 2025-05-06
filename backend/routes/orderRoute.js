import express from "express";
import { authenticate,adminCheck } from "../middleware/authMiddleware.js";
import { createOrder,getAllOrder,getUserOrders,countTotalOrder,calcTotalSales,calculateTotalSalesByDate,findOrderById,markOrderAsPaid,markOrderAsDelivered } from "../controllers/order_Controller.js";


const router=express.Router()

router.route("/").post(authenticate,createOrder).get(authenticate,adminCheck,getAllOrder);
router.route("/mine").get(authenticate,getUserOrders)
router.route("/total_orders").get(countTotalOrder)
router.route("/total_sales").get(calcTotalSales)
router.route("/total_sales_by_date").get(calculateTotalSalesByDate)
router.route("/:id").get(authenticate,findOrderById)
router.route("/:id/pay").put(authenticate,markOrderAsPaid)
router.route("/:id/deliver").put(authenticate,adminCheck,markOrderAsDelivered)


export default router;