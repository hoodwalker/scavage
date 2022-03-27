const express = require('express')
const router = express.Router()
const { getAllHunts, getHunt, createHunt, updateHunt, deleteHunt } = require('../controllers/huntController')
const { protect } = require('../middleware/authMiddleware')
const Hunt = require('../models/huntModel')


router.get('/', protect, getAllHunts)
router.get('/:id', protect, getHunt)
router.post('/', protect, createHunt)
router.put('/:id', protect, updateHunt)
router.delete('/:id', protect, deleteHunt)

module.exports = router