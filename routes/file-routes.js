const express = require('express')
const router = express.Router();
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {addFile,renameFile,moveFile,deleteFile} = require('../controllers/file-controller')
const authenticateUser = require('../middleware/authentication');

router.route('/addfile/:parentFolderId').post(authenticateUser,upload.single('file'),addFile)
router.route('/manageFiles/:fileId').put(authenticateUser ,renameFile).delete(authenticateUser , deleteFile)
router.route('/manageFiles/:fileId/newFolderId').put(authenticateUser , moveFile)

module.exports = router;

