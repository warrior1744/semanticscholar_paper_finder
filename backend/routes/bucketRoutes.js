import express from 'express'
import { getPapersFromBucket, 
         getPaperFromBucketById,
         deletePapersFromBucket,
         deletePaperFromBucketById,
         addPaperToBucket,
       } from '../controllers/bucketController.js'

const router = express.Router()

router.route('/')
      .get(getPapersFromBucket)
      .post(addPaperToBucket)
      .delete(deletePapersFromBucket)

router.route('/:id')
      .get(getPaperFromBucketById)
      .delete(deletePaperFromBucketById)

export default router