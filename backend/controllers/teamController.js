const asyncHandler = require('express-async-handler')
const Team = require('../models/teamModel')
const User = require('../models/userModel')

// @desc    Get teams
// @route   GET /api/teams
// @access  Private
const getTeams = asyncHandler(async (req, res)=>{
    try {
        const teams = await Team.find({ user: req.user.id })
        return res.status(200).json(teams)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Get team
// @route   GET /api/teams/:id
// @access  Private
const getTeam = asyncHandler(async (req, res)=>{
    try {
        // id is in req.params.id
        const team = await Team.findById(req.params.id).populate('captain').populate('members')
        return res.status(200).json(team)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Create teams
// @route   POST /api/teams
// @access  Private
const createTeam = asyncHandler(async (req, res)=>{
    try {
        const { name, description, avatar } = req.body
        let { captain, members } = req.body
        if(!req.body.name){
            return res.status(400)
            throw new Error('Please add a team name.')
        }
        if(!req.body.description){
            return res.status(400)
            throw new Error('Please add a team description.')
        }
        if(!captain){ captain = req.user }
        if(!members){ members = [req.user] }
        if(members.length == 0 ){ members.push(req.user) }
        const team = await Team.create({ captain, members, name, description, avatar })
        return res.status(200).json(team)
    } catch (error) {
        return res.status(500)
    }
})


// @desc    Add team member :userId in body
// @route   POST /api/teams/add
// @access  Private
const addTeamMember = asyncHandler(async (req, res)=>{
    try {
        const team = await Team.findById(req.body.id)
        const user = await User.findById(req.body.userId)
        if(user){
            team.members.push(user._id)
            team.update()
            team.save()
            return res.status(200).json(team)
        }else{
            return res.status(401)
            throw new Error('Attempted to add invalid user.')
        }
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Add team member :userIds[] in body
// @route   POST /api/teams/add
// @access  Private
const addTeamMembers = asyncHandler(async (req, res)=>{
    try {
        const userId = req.body.userId
        let userIds = null
        if(userId){
            addTeamMember(req, res)
        }else{
            userIds = req.body.userIds
        }
        const team = await Team.findById(req.body.id)
        const users = await User.find().where('_id').in(userIds)
        if(users){        
            team.members.push(...users)
            team.update()
            team.save()
            return res.status(200).json(team)
        }else{
            return res.status(401)
            throw new Error('Attempted to add invalid user.')
        }
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Add team member :userId in body
// @route   POST /api/teams/remove
// @access  Private
const removeTeamMember = asyncHandler(async (req, res)=>{
    try {
        const team = await Team.findById(req.body.id)
        const user = await User.findById(req.body.userId)
        if(user && team && team.members.includes(user._id)){
            team.members.pop(user._id)
            team.update()
            team.save()
            return res.status(200).json(team)
        }else{
            return res.status(401)
            throw new Error('Attempted to remove invalid user.')
        }
    } catch (error) {
        return res.status(500)
    }
})

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Private
const updateTeam = asyncHandler(async (req, res)=>{
    const team = await Team.findById(req.params.id)
    if(!team){
        return res.status(400)
        throw new Error('Team not found.')
    }

    if(!req.user || team.captain.toString() !== req.user.id){
        return res.status(401)
        throw new Error('User not authorized')
    }

    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {new: true})
    return res.status(200).json(updatedTeam)
})

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Private
const deleteTeam = asyncHandler(async (req, res)=>{
    const team = await Team.findById(req.params.id)
    if(!team){
        return res.status(400)
        throw new Error('Team not found.')
    }

    if(!req.user || team.captain.toString() !== req.user.id){
        return res.status(401)
        throw new Error('User not authorized')
    }

    await team.remove()
    return res.status(200).json({id: req.params.id})
})


module.exports = {getTeams, getTeam, createTeam, addTeamMember, addTeamMembers, removeTeamMember, updateTeam, deleteTeam}