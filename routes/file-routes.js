const express = require('express')
const router = express.Router();
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {addFile} = require('../controllers/file-controller')
const authenticateUser = require('../middleware/authentication');

router.route('/addfile/:parentFolderId').post(authenticateUser,upload.single('file'),addFile)

module.exports = router;

