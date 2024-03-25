import express from "express";
import {
  deleteUserProfile,
  forgotPassword,
  getAllUsers,
  logingUser,
  logout,
  myProfile,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
  userDetails,
} from "../controllers/users.controllers.js";
import { authRoles, isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(logingUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isLoggedIn, myProfile);
router.route("/me/update/password").put(isLoggedIn, updatePassword);
router.route("/me/update/profile").put(isLoggedIn, updateProfile);

// ****************************************Admin Routes **********************************************
router.route("/admin/users").get(isLoggedIn,authRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isLoggedIn,authRoles("admin"),userDetails).put(isLoggedIn,authRoles("admin"),updateUserRole).delete(isLoggedIn,authRoles("admin"),deleteUserProfile)
export default router;
