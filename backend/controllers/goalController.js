const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res)=>{
    try {
        const goals = await Goal.find({ user: req.user.id })
        return res.status(200).json(goals)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Get goal
// @route   GET /api/goals/:id
// @access  Private
const getGoal = asyncHandler(async (req, res)=>{
    try {
        // id is in req.params.id
        const goal = await Goal.findById(req.params.id)
        return res.status(200).json(goal)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Create goals
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res)=>{
    try {
        if(!req.body.text){
            return res.status(400)
            throw new Error('Please add a text field')
        }
        const goal = await Goal.create({ text: req.body.text, user: req.user.id })
        return res.status(200).json(goal)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res)=>{
    try {
        const goal = await Goal.findById(req.params.id)
        if(!goal){
            return res.status(400)
            throw new Error('Goal not found.')
        }
    
        if(!req.user){
            return res.status(401)
            throw new Error('User not authorized')
        }
    
        if(goal.user.toString() !== req.user.id){
            return res.status(401)
            throw new Error('User not authorized')
    
        }
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedGoal)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res)=>{
    try {
        const goal = await Goal.findById(req.params.id)
        if(!goal){
            return res.status(400)
            throw new Error('Goal not found.')
        }
    
        if(!req.user){
            return res.status(401)
            throw new Error('User not authorized')
        }
    
        if(goal.user.toString() !== req.user.id){
            return res.status(401)
            throw new Error('User not authorized')
    
        }
        await goal.remove()
        return res.status(200).json({id: req.params.id})
    } catch (error) {
        return res.status(500)
    }
})


module.exports = {getGoals, getGoal, setGoal, updateGoal, deleteGoal}