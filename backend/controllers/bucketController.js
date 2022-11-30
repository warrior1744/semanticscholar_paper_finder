import Bucket from '../models/bucketModel.js'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//@desc Fetch all papers in the bucket
//@route GET /api/bucket
//@access Private

const getPapersFromBucket = asyncHandler (async (req, res) => {
    const bucket =  await Bucket.find({user: req.user._id})
    if(bucket){
        res.json(bucket)
    }else{
        res.status(404)
        throw new Error('Bucket not found')
    }
})

//@desc Fetch a paper in the bucket
//@route GET /api/bucket/:id
//@access Private

const getPaperFromBucketById = asyncHandler (async (req, res) => {
    const paper = await Bucket.findById(req.params.id).populate(
        {
            path: 'user',
            select: 'firstname lastname email'
        }
    )
    if(paper) {
        res.json(paper)
    }else{
        res.status(404)
        throw new Error('Paper not found in the bucket')
    }
})

//@desc Add a paper in the bucket
//@route POST /api/bucket
//@access Private

const addPaperToBucket = asyncHandler (async (req, res) => {

    const { paperId,
            title,
            authors,
            journal,
            publicationDate,
            publicationTypes,
            fieldsOfStudy,
            abstract,
            url,
            year,
            s2FieldsOfStudy} = req.body

    const paperExists = await Bucket.findOne({paperId: paperId, user: req.user._id})

    if(paperExists){
        res.status(404)
        throw new Error('paper already exists')
    }else{
        const paper = await Bucket.create({
            user: req.user._id,
            paperId,
            title,
            authors,
            journal,
            publicationDate,
            publicationTypes,
            fieldsOfStudy,
            abstract,
            url,
            year,
            s2FieldsOfStudy,
        })

        if(paper){
            res.status(201).json(paper)
        }else{
            res.status(400)
            throw new Error('paper added to bucket failed')
        }
    }
})

//@desc Delete all papers in the users bucket
//@route DELETE /api/bucket
//@access Private

const deletePapersFromBucket = asyncHandler (async (req, res) => {
    const papers = await Bucket.find({user: req.user._id})
    
    if(papers){
        await Bucket.deleteMany({user: req.user._id})
        res.json({message: `The papers are removed from the bucket`})
    }else{
        res.status(404)
        throw new Error('Papers not found')
    }
})

//@desc Delete single paper in the bucket
//@route DELETE /api/bucket/:id
//@access Private

const deletePaperFromBucketById = asyncHandler (async (req, res) => {
    const paper = await Bucket.findById(req.params.id).populate(        
        {
        path: 'user',
        select: 'firstname lastname email'
    })
    if(paper){
        const paperId = paper.paperId
        await paper.remove()
        res.json({message: `The paper (paperId: ${paperId}) is removed from the bucket`, paperId: paperId})
    }else{
        res.status(404)
        throw new Error('Paper not found')
    }
})

export { 
        getPapersFromBucket, 
        getPaperFromBucketById, 
        deletePapersFromBucket,
        deletePaperFromBucketById,
        addPaperToBucket
       }