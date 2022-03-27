const express = require('express')
const router = express.Router()
const { getAllProfiles, getProfile, createProfile, updateProfile, deleteProfile } = require('../controllers/profileController')
const { protect } = require('../middleware/authMiddleware')
const User = require('../models/userModel')
const Profile = require('../models/profileModel')


router.get('/', protect, getAllProfiles)
router.get('/:userid', protect, getProfile)
router.post('/', protect, createProfile) // userid is in req.body
router.put('/', protect, updateProfile) // userid is in req.body
router.delete('/:id', protect, deleteProfile) // :id is profileId

module.exports = router