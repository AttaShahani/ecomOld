import express from "express";
import { authRoles, isLoggedIn } from "../middlewares/auth.js";
import {
  deleteOrder,
  getAllOrders,
  myOrders,
  newOrder,
  orderDetails,
  updateOrderStatus,
} from "../controllers/order.controllers.js";
const router = express.Router();

//******************************************User Routes ********************************************** */
router.route("/order/new").post(isLoggedIn, newOrder);
router.route("/orders/me").get(isLoggedIn, myOrders);
router.route("/order/:id").get(isLoggedIn, orderDetails);
//******************************************Admin Routes ********************************************** */
router
  .route("/admin/orders/all")
  .get(isLoggedIn, authRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isLoggedIn, authRoles("admin"), updateOrderStatus)
  .delete(isLoggedIn, authRoles("admin"), deleteOrder);

export default router;
