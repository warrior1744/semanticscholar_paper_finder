import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'

import bucketRoutes from './routes/bucketRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


const app = express()

dotenv.config()

connectDB()

app.use(express.json()) //accept json format in the body. replaced bodyParser.json() since the new release
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/bucket', bucketRoutes)
app.use('/api/users', userRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
)

