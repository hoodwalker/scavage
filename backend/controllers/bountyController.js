const asyncHandler = require('express-async-handler')
const Bounty = require('../models/bountyModel')
const User = require('../models/userModel')

// @desc    Get bounties for current user
// @route   GET /api/bounties
// @access  Private
const getMyBounties = asyncHandler(async (req, res)=>{
    try {
        const bounties = await Bounty.find({ user: req.user.id })
        return res.status(200).json(bounties)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Get bounties where isPublic is true
// @route   GET /api/bounties
// @access  Private
const getPublicBounties = asyncHandler(async (req, res)=>{
    try {
        const bounties = await Bounty.find({ isPublic: true })
        return res.status(200).json(bounties)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Get bounties
// @route   GET /api/bounties
// @access  Private
const getAllBounties = asyncHandler(async (req, res)=>{
    try {
        const bounties = await Bounty.find()
        return res.status(200).json(bounties)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Get bounties
// @route   GET /api/bounties
// @access  Private
const getBounty = asyncHandler(async (req, res)=>{
    try {
        const bounty = await Bounty.findById(req.params.id)
        return res.status(200).json(bounty)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    create bounty
// @route   POST /api/bounties/:id
// @access  Private
const createBounty = asyncHandler(async (req, res)=>{
    try {
        const { 
            name,
            description,
            isPublic,
            commonality,
            isGeoFixed,
            location, 
            geofence,
            isMultiple,
            submissionType,
            pointValue,
            ageFilter
        } = req.body
        let user = req.body.user
        if(user == null ){
            user = req.user
        }
        const bounty = await Bounty.create({
            name,
            description,
            user,
            isPublic,
            commonality,
            isGeoFixed,
            location, 
            geofence,
            isMultiple,
            submissionType,
            pointValue,
            ageFilter
        })
        if(bounty){
            return res.status(201).json(bounty)
        }else{
            res.status(400)
            throw new Error('Invalid bounty ID')
        }
    } catch (error) {
        return res.status(500)
    }
})

// @desc    update bounty
// @route   PUT /api/bounties/:id
// @access  Private
const updateBounty = asyncHandler(async (req, res)=>{
    try {
        const bounty = await Bounty.findById(req.params.id)
        if(!bounty){
            return res.status(400)
            throw new Error('Bounty not found.')
        }
        // TODO: identify users authorized to update the bounty
        if(!req.user || req.user.id.toString() !== bounty.user._id.toString() ){
            return res.status(401)
            throw new Error('User not authorized')
        }
    
        const updatedBounty = await Bounty.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedBounty)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    delete bounty
// @route   DELETE /api/bounties/:id
// @access  Private
const deleteBounty = asyncHandler(async (req, res)=>{
    try {
        const bounty = await Bounty.findById(req.params.id)
        if(!bounty){
            return res.status(400)
            throw new Error('Bounty not found.')
        }
    
        if(!req.user || req.user.id.toString() !== bounty.user._id.toString() ){
            return res.status(401)
            throw new Error('User not authorized')
        }
        await bounty.remove()
        return res.status(200).json({id: req.params.id})
    } catch (error) {
        return res.status(500)
    }
})

module.exports = { getMyBounties, getPublicBounties, getAllBounties, getBounty, createBounty, updateBounty, deleteBounty }