const asyncHandler = require('express-async-handler')
const Capture = require('../models/captureModel')
const Hunt = require('../models/huntModel')
const Bounty = require('../models/bountyModel')
const User = require('../models/userModel')
const Team = require('../models/teamModel')

// @desc    Get all captures
// @route   GET /api/captures/:userId/:teamId/:huntId
// @access  Private
const getCaptures = asyncHandler(async (req, res)=>{
    try {
        const { userId, teamId, huntId } = req.params
        /* if userId is null
            and teamId is null
            and huntId is null
            then return getAllCaptures
        */
        //router.get('/', protect, getAllCaptures)
        //router.get('/:userId', protect, getMyCaptures)
        //router.get('/0/:teamId', protect, getTeamCaptures)
        //router.get('/0/0/:huntId', protect, getHuntCaptures)
        //router.get('/:userId/0/:huntId', protect, getMyHuntCaptures)
        //router.get('/0/:teamId/:huntId', protect, getTeamHuntCaptures)
        console.log(req.params)
    
        if(!userId){
            if(!teamId){
                if(!huntId){
                    // /0/0/0
                    const captures = await getAllCaptures(req, res);
                    return res.status(200).json(captures)
                }else{
                    // /0/0/:huntId
                    const captures = await getHuntCaptures(req, res);
                    return res.status(200).json(captures)
                }
            }else{ // teamId
                if(!huntId){
                    // /0/:teamId/0
                    const captures = await getTeamCaptures(req, res);
                    return res.status(200).json(captures)
                }else{
                    // /0/:teamId/:huntId
                    const captures = await getTeamHuntCaptures(req, res);
                    return res.status(200).json(captures)
                }
            }
        }else{ // userId
            if(!teamId){
                if(!huntId){
                    // /:userId/0/0
                    const captures = await getMyCaptures();
                    return res.status(200).json(captures)
                }else{
                    // /:userId/0/:huntId
                    const captures = await getMyHuntCaptures();
                    return res.status(200).json(captures)
                }
            }else{ // teamId
                if(!huntId){
                    // /:userId/:teamId/0
                    const captures = await getTeamCaptures(req, res);
                    return res.status(200).json(captures)
                }else{ // huntId
                    // /:userId/:teamId/:huntId
                    const captures = await getTeamHuntCaptures(req, res);
                    return res.status(200).json(captures)
                }
            }
        }
    } catch (error) {
        return res.status(500)
    }
})

const getAllCaptures = asyncHandler(async (req, res)=>{
    try {
        const captures = await Capture.find()
        return captures
    } catch (error) {
        return res.status(500)
    }
})
const getMyCaptures = asyncHandler(async (req, res)=>{
    try {
        const captures = await Capture.find({user : req.params.userId})
        return captures
    } catch (error) {
        return res.status(500)
    }
})
const getTeamCaptures = asyncHandler(async (req, res)=>{
    try {
        const captures = await Capture.find({team : req.params.teamId})
        return captures
    } catch (error) {
        return res.status(500)
    }
})
const getHuntCaptures = asyncHandler(async (req, res)=>{
    try {
        const captures = await Capture.find({hunt : req.params.huntId})
        return captures
    } catch (error) {
        return res.status(500)
    }
})
const getMyHuntCaptures = asyncHandler(async (req, res)=>{
    try {
        const captures = await Capture.find({hunt : req.params.huntId, user : req.params.userId})
        return captures
    } catch (error) {
        return res.status(500)
    }
})
const getTeamHuntCaptures = asyncHandler(async (req, res)=>{
    try {
        console.log("In TeamHuntCaptures: ", req.params)
        const captures = await Capture.find({hunt : req.params.huntId, team : req.params.teamId})
        return captures
    } catch (error) {
        return res.status(500)
    }
})


// @desc    Get capture by capture id
// @route   GET /api/capture/find/:id
// @access  Private
const getCapture = asyncHandler(async (req, res)=>{
    try {
        const capture = await Capture.findById(req.params.id).populate("user").populate("team").populate("bounty").populate("hunt")
        if(capture){
            return res.status(200).json(capture)
        }else{
            return res.status(400)
            throw new Error('Invalid capture ID')
        }
    } catch (error) {
        return res.status(500)
    }
})


// @desc    Update capture
// @route   PUT /api/capture/:id
// @access  Private
const createCapture = asyncHandler(async (req, res)=>{
    try {
        const { user, team, hunt, bounty, response, description, location } = req.body
    /*     if(req.params.user.id !== req.user.id){
            return res.status(400)
            throw new Error('Invalid submitter ID')
        } */
        if(user === null ){
            user = req.user
        }
        const capture = await Capture.create({ user, team, hunt, bounty, response, description, location })
        if(capture){
            return res.status(201).json(capture)
        }else{
            res.status(400)
            throw new Error('Invalid capture')
        }
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Update capture
// @route   PUT /api/capture/:id
// @access  Private
const updateCapture = asyncHandler(async (req, res)=>{
    try {
        const capture = await Capture.findById(req.params.id)
        if(!capture){
            return res.status(400)
            throw new Error('Capture not found.')
        }
    
        if(!req.user || capture.user.toString() !== req.user.id){
            return res.status(401)
            throw new Error('User not authorized')
        }
    
        const updatedCapture = await Capture.findByIdAndUpdate(req.params.id, req.body, {new: true})
        return res.status(200).json(updatedCapture)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Delete capture 
// @route   DELETE /api/capture/:id
// @access  Private
const deleteCapture = asyncHandler(async (req, res)=>{
    try {
        const capture = await Capture.findById(req.params.id)
        if(!capture){
            return res.status(400)
            throw new Error('Capture not found.')
        }
    
        if(!req.user  || capture.user.toString() !== req.user.id){
            return res.status(401)
            throw new Error('User not authorized')
        }
    
        await capture.remove()
        return res.status(200).json({id: req.params.id})
    } catch (error) {
        return res.status(500)
    }
})

module.exports = { getCaptures, getCapture, createCapture, updateCapture, deleteCapture } 