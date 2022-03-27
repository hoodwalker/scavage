const express = require('express')
const router = express.Router()
const { getMyBounties, getPublicBounties, getAllBounties, getBounty, createBounty, updateBounty, deleteBounty } = require('../controllers/bountyController')
const { protect } = require('../middleware/authMiddleware')
const Bounty = require('../models/bountyModel')


router.get('/me', protect, getMyBounties)
router.get('/public/', protect, getPublicBounties)
router.get('/', protect, getAllBounties)
router.get('/:id', protect, getBounty)
router.post('/', protect, createBounty)
router.put('/:id', protect, updateBounty)
router.delete('/:id', protect, deleteBounty)

module.exports = router