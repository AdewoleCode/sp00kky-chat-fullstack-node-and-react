const express = require('express')
const router = express.Router()

const { getMsg, createMsg } = require('../controllers/messageController')


router.route('/getmessage').post(getMsg)
router.route('/createmessage').post(createMsg)

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });


module.exports = router