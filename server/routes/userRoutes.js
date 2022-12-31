const express = require('express')
const router = express.Router()

const { register, login, setAvatar, getAllUsers } = require('../controllers/userController')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/setAvatar/:id').post(setAvatar)
router.route('/allusers/:id').get(getAllUsers)


module.exports = router




