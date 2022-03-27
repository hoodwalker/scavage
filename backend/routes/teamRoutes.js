const express = require('express')
const router = express.Router()
const { getTeams, getTeam, createTeam, addTeamMember, addTeamMembers, removeTeamMember, updateTeam, deleteTeam} = require('../controllers/teamController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTeams)
router.route('/').post(protect, createTeam)
router.route('/add/').post(protect, addTeamMember)
router.route('/addmany/').post(protect, addTeamMembers)
router.route('/remove/').post(protect, removeTeamMember)
router.route('/:id').get(protect, getTeam)
router.route('/:id').put(protect, updateTeam)
router.route('/:id').delete(protect, deleteTeam)

module.exports = router