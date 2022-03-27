const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password ){
            res.status(400)
            throw new Error ('Please add all fields')
        }

        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error ('User already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPW = await bcrypt.hash(password, salt)

        const user = await User.create({ name, email, password: hashedPW })
        if(user){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else{
            res.status(400)
            throw new Error('Invalid user data')
        }
    }catch(err){
       return res.status(500) 
    }
})
// @desc    Authenticate a new user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    try{
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid credentials')
        }
    }catch(err){
        return res.status(500) 
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (err) {
        return res.status(500) 
    }
})

// @desc    Get users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        return res.status(500) 
    }
})

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res)=>{
    try {
        // id is in req.params.id
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        return res.status(500) 
    }
})

// @desc    Create users
// @route   POST /api/users
// @access  Private
const setUser = asyncHandler(async (req, res)=>{
    try {
        if(!req.body.text){
            res.status(400)
            throw new Error('Please add a text field')
        }
        const user = await User.create({ text: req.body.text })
        res.status(200).json(user)
    } catch (error) {
        return res.status(500) 
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(400)
            throw new Error('user not found.')
        }
        const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updateduser)
    } catch (error) {
        return res.status(500) 
    }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(400)
            throw new Error('user not found.')
        }
        await user.remove()
        res.status(200).json({id: req.params.id})
    } catch (error) {
        return res.status(500) 
    }
})

const generateToken =  (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d' })
}

//getUsers, getUser, registerUser, setUser, updateUser, deleteUser,
module.exports = { registerUser, loginUser, getMe }