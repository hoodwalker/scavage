const express = require('express')
const router = express.Router()
const {  registerUser, loginUser, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

//router.route('/').get(getUsers).post(setUser)
//router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)


module.exports = router