import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'


// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('使用者帳號或密碼錯誤')
    }
})

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler (async (req, res) => {
    const { firstname, lastname, email, password, isAdmin} = req.body
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400)
        throw new Error('Bad Request ! user already exists')
    }

    const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        isAdmin
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Bad Request ! invalid user data')
    }
})


// @desc Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) //you get logged in user id from the req.user data in protect middleware

    if(user){
        user.firstname = req.body.firstname || user.firstname
        user.lastname = req.body.lastname || user.lastname
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            first: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc get users api
// @route GET /api/users/
// @access Private/Admin

const getUsers = asyncHandler (async (req, res) =>{
    const users = await User.find({})
    res.json(users)
})

// @desc GET an user by ID
// @route GET /api/users/:id
// @access Private/Admin

const getUserDetailsById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error(`404 Not Found ! Failed retrieving user's information`)
    }
})

// @desc Update user by ID
// @route PUT /api/users/:id
// @access Private/Admin

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.firstname = req.body.firstname || user.firstname
        user.lastname = req.body.lastname || user.lastname
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error(`404 Not Found ! Failed finding the user`)
    }
})

// @desc delete an user
// @route DELETE /api/users/:id
// @access Private/Admin

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        const username = user.firstname +' '+user.lastname
        await user.remove()
        res.json({ message: `The user ${username} is removed`})
    }else{
        res.status(404)
        throw new Error('404 Not Found ! user not found')
    }
})

export { getUsers, authUser, registerUser, updateUserProfile, deleteUserById, getUserDetailsById, updateUserById}