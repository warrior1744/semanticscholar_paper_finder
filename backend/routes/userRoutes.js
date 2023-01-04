import express from "express";
import {
  authUser,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUserById,
  getUserDetailsById,
  updateUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

//      '/api/users'
router.post("/login", authUser);
router.route("/profile").put(protect, updateUserProfile);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUserById)
  .get(protect, admin, getUserDetailsById)
  .put(protect, admin, updateUserById);

export default router