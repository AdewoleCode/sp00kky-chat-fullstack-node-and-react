const express = require('express')
const router = express.Router()

const { getMsg, createMsg } = require('../controllers/messageController')


router.route('/getmessage').get(getMsg)
router.route('/createmessage').post(createMsg)




module.exports = router