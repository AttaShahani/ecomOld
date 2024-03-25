import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProductReviews,
  getAllProducts,
  getLatestProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/products.controller.js";
import { authRoles, isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/products/latest").get(getLatestProducts);
router.route("/product/:id").get(getProductDetails)
//****************************** Authenticated User Routees **************************************** */
router.route("/product/reviews/new").put(isLoggedIn,createProductReview)
router.route("/product/reviews/all").get(getAllProductReviews)
// ************************************ Admin Routes ***************************************************
router.route("/admin/product/new").post(isLoggedIn, authRoles("admin"), createProduct);
router.route("/admin/product/:id").put(isLoggedIn, authRoles("admin"), updateProduct).get(getProductDetails).delete(isLoggedIn, authRoles("admin"), deleteProduct);
router.route("/admin/product/reviews/delete").delete(isLoggedIn,authRoles("admin"),deleteReview)
export default router;
