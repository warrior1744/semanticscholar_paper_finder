import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import bucket from './data/bucket.js'
import User from './models/userModel.js'
import Bucket from './models/bucketModel.js'
import connectDB from './config/db.js'

dotenv.config()

await connectDB()

const importData = async () => {
    try{
        await Bucket.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleBucket = bucket.map(paper => {
            return {
                ...paper, user:adminUser
            }
        })

        await Bucket.insertMany(sampleBucket)
        console.log('Data Imported'.green.inverse)
        process.exit()
    }catch (error){
        console.error(`Error: ${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await Bucket.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    }catch (error){
        console.error(`Error: ${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else {
    importData()
}