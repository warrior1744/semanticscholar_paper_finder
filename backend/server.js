import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import path from 'path'
import bucketRoutes from './routes/bucketRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


const app = express()

dotenv.config()

connectDB()

app.use(express.json()) //accept json format in the body. replaced bodyParser.json() since the new release
app.use(express.urlencoded({extended: false}))

app.use('/api/bucket', bucketRoutes)
app.use('/api/users', userRoutes)

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else{
    app.get('/', (req, res) => {
    res.send('API is running...')
})
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)

