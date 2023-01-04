import express from "express";
import {
  getPapersFromBucket,
  getPaperFromBucketById,
  deletePapersFromBucket,
  deletePaperFromBucketById,
  addPaperToBucket,
} from "../controllers/bucketController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getPapersFromBucket)
  .post(protect, addPaperToBucket)
  .delete(protect, deletePapersFromBucket);

router
  .route("/:id")
  .get(protect, getPaperFromBucketById)
  .delete(protect, deletePaperFromBucketById);

export default router