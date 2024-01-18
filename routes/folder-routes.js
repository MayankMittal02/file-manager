const express = require('express')
const router = express.Router();
const {createFolder,createSubFolder} = require('../controllers/folder-controller')
const authenticateUser = require('../middleware/authentication');


router.route('/createFolder').post(authenticateUser,createFolder)
router.route('createFolder/:parentFolderId').post(authenticateUser,createSubFolder)


module.exports = router;