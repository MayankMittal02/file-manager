const express = require('express')
const router = express.Router();
const {createFolder,createSubFolder} = require('../controllers/folder-controller')

router.route('/').post(createFolder)
router.route('/:parentFolderId').post(createSubFolder)


module.exports = router;