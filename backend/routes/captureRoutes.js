const express = require('express')
const router = express.Router()
//const { getAllCaptures, getMyCaptures, getTeamCaptures, getHuntCaptures, getMyHuntCaptures, getTeamHuntCaptures, getCapture, createCapture, updateCapture, deleteCapture } = require('../controllers/captureController')
const { getCaptures, getCapture, createCapture, updateCapture, deleteCapture } = require('../controllers/captureController')
const { protect } = require('../middleware/authMiddleware')
const Capture = require('../models/captureModel')

// root route can specify /:userId/:teamId/:huntId
//router.get('/', protect, getAllCaptures)
//router.get('/:userId', protect, getMyCaptures)
//router.get('/:userId/:teamId', protect, getTeamCaptures)
//router.get('/0/0/:huntId', protect, getHuntCaptures)
//router.get('/:userId/0/:huntId', protect, getMyHuntCaptures)
//router.get('/0/:teamId/:huntId', protect, getTeamHuntCaptures)
router.get('/:userId/:teamId/:huntId', protect, getCaptures)
router.get('/find/:id', protect, getCapture)
router.post('/', protect, createCapture)
router.put('/:id', protect, updateCapture)
router.delete('/:id', protect, deleteCapture)

module.exports = router