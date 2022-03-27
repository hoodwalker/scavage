const asyncHandler = require('express-async-handler')
const Hunt = require('../models/huntModel')
const Bounty = require('../models/bountyModel')
const User = require('../models/userModel')

// @desc    Get all hunts
// @route   GET /api/hunts
// @access  Private
const getAllHunts = asyncHandler(async (req, res)=>{
    try {
        const hunts = await Hunt.find()
        res.status(200).json(hunts)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Get hunt by hunt id
// @route   GET /api/hunts/:id
// @access  Private
const getHunt = asyncHandler(async (req, res)=>{
    try {
        const hunt = await Hunt.findById(req.params.id).populate("bounties").populate("authorizedUsers")
        if(hunt){
            return res.status(200).json(hunt)
        }else{
            return res.status(400)
            throw new Error('Invalid hunt ID')
        }
    } catch (error) {
        return res.status(500)
    }
})


// @desc    create hunt
// @route   POST /api/hunts/:id
// @access  Private
const createHunt = asyncHandler(async (req, res)=>{
    try {
        const { 
            bounties,
            authorizedUsers,
            title, 
            description, 
            type, 
            isActive,
            isComplete, 
            scavagePoints, 
            timeConstraint, 
            locationShape, 
            sequential, 
            hidden, 
            autoApprove,
            completionMessage,
            prize
        } = req.body
        if(authorizedUsers === null ){
            authorizedUsers = [req.user]
        }
        if(!authorizedUsers.includes(req.user)){
            authorizedUsers.push(req.user)
        }
        const hunt = await Hunt.create({
            bounties,
            title, 
            description, 
            type, 
            isActive,
            isComplete, 
            scavagePoints, 
            timeConstraint, 
            locationShape, 
            sequential, 
            hidden, 
            autoApprove,
            completionMessage,
            prize,
            authorizedUsers
        })
        if(hunt){
            return res.status(201).json(hunt)
        }else{
            return res.status(400)
            throw new Error('Invalid hunt ID')
        }
    } catch (error) {
        return res.status(500)
    }
})

// @desc    update hunt
// @route   PUT /api/hunts/:id
// @access  Private
const updateHunt = asyncHandler(async (req, res)=>{
    try {
        const hunt = await Hunt.findById(req.params.id)
        if(!hunt){
            return res.status(400)
            throw new Error('Hunt not found.')
        }
        // TODO: identify users authorized to update the hunt
        if(!req.user){
            return res.status(401)
            throw new Error('User not authorized')
        }
    
        const updatedHunt = await Hunt.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedHunt)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    delete hunt
// @route   DELETE /api/hunts/:id
// @access  Private
const deleteHunt = asyncHandler(async (req, res)=>{
    try {
        const hunt = await Hunt.findById(req.params.id)
        if(!hunt){
            return res.status(400)
            throw new Error('Hunt not found.')
        }
    
        if(!req.user){
            return res.status(401)
            throw new Error('User not authorized')
        }
        await hunt.remove()
        return res.status(200).json({id: req.params.id})
    } catch (error) {
        return res.status(500)
    }
})
module.exports = { getAllHunts, getHunt, createHunt, updateHunt, deleteHunt }