const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')



// @desc    view all profiles
// @route   GET /api/profiles/
// @access  Private
const getAllProfiles = asyncHandler(async (req, res) => { 
    try {
        const profiles = await Profile.find()
        return res.status(200).json(profiles)
    } catch (error) {
        return res.status(500)
    }
})

// @desc    create a user profile
// @route   POST /api/profiles/:userid
// @access  Private
const createProfile = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, birthYear, zipcode, avatar, userId } = req.body
        
        const user = await User.findById(req.body.userId.toString())
        const existingProfile = await Profile.findOne({ user: req.body.userId })
        if(existingProfile){
            //return res.send('User already has a profile.')
            return updateProfile(req, res);
        }
        if(user){
            const profile = await Profile.create({...req.body, user : user })
            //console.log(profile.firstName, profile.lastName, profile.birthYear, profile.zipcode)
            if(profile){
                // create new profile
                return res.status(201).json({
                    user: user,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    birthYear: profile.birthYear, // convert from string to number
                    zipcode: profile.zipcode, // convert from string to number
                    avatar: profile.avatar, // blob? base64? String?
                })
            }
        } else{
            return res.status(400)
            throw new Error('Invalid user.')
        }
    } catch (error) {
        return res.status(500)
    }
})


// @desc    get a user profile
// @route   GET /api/profiles/:userid
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.find({ user: req.params.userid })
        if(profile){
            // return profile
            return res.status(200).json({
                profile
            })
        }else{
            // return error or redirect to Create profile
            return res.status(400)
            throw new Error('User has no profile.')
        }
    } catch (error) {
        return res.status(500)
    }
})

// @desc    update a user profile
// @route   PUT /api/profiles/
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, birthYear, zipCode, avatar, userid } = req.body
    
        const oldProfile = await Profile.findOne({ user: req.body.userId.toString() })
        const profileId = oldProfile._id
        if(oldProfile){
            const updatedprofile = await Profile.findByIdAndUpdate(profileId.toString(), req.body, {new: true})
            return res.status(200).json({
                updatedprofile
            })
        }else{
            // return error or redirect to Create profile
            return res.status(400)
            throw new Error('User has no profile.')
        }
    } catch (error) {
        return res.status(500)
    }
})


// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private
const deleteProfile = asyncHandler(async (req, res)=>{
    try {
        const profile = await Profile.findById(req.params.id)
        if(!profile){
            return res.status(400)
            throw new Error('Profile not found.')
        }
    
        //if(!req.user || profile.user.toString() !== req.user.id){
        //    return res.status(401)
        //    throw new Error('User not authorized')
        //}
    
        await profile.remove()
        return res.status(200).json({id: req.params.id})
    } catch (error) {
        return res.status(500)
    }
})

module.exports = { getAllProfiles, getProfile, createProfile, updateProfile, deleteProfile }