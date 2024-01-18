const { StatusCodes } = require('http-status-codes');
const pool = require('../connection')
const asycnWrapper = require('../middleware/async')

const addFile = asycnWrapper(async (req, res) => {
    const { parentFolderId } = req.params;
    const { userId } = req.user.userId
    const { originalname, buffer, size } = req.file;


    const parentFolderQuery = `select * from folders where folder_id = $1`
    const parentFolder = await pool.query(parentFolderQuery, [parentFolderId])

    if (parentFolder.rows[0].user_id !== userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "unauthorized permission" })
    }

    const s3Params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${parentFolderId}/${originalname}`,
        Body: buffer,
        ContentType: req.file.mimetype,
    };

    const s3UploadResponse = await s3.upload(s3Params)
    const uploadDate = new Date();
    const insertQuery = 'INSERT INTO files (file_name, file_size, folder_id, user_id, upload_date) VALUES ($1, $2, $3, $4, $5)';
    const insertValues = [originalname, size, parentFolderId, userId, uploadDate];
    const insertedFileResult = await pool.query(insertQuery, insertValues);
    const insertedFile = insertedFileResult.rows[0];
    res.status(StatusCodes.CREATED).json({ msg: 'File added successfully.', file: insertedFile })
})

const renameFile = asycnWrapper(async (req, res) => {
    const { fileId } = req.params;
    const { newFilename } = req.body;

    const query = `update files set file_name = $1 where file_id = $2 returning *`
    const updatedFileResult = await pool.query(query, [newFilename, fileId]);
    const updatedFile = updatedFileResult.rows[0];
    res.status(200).json({ message: 'File renamed successfully.', file: updatedFile });
})

const moveFile = asycnWrapper(async(req,res)=>{
    const { fileId, newFolderId } = req.params;
    const query = `update files set folder_id =$1 where file_id = $2 returning *`

    const movedFileResult = await pool.query(query, [newFolderId , fileId]);
    const movedFile = movedFileResult.rows[0];
    res.status(200).json({ msg: 'File moved successfully.', file: movedFile });
    
})

const deleteFile = asycnWrapper(async(req,res)=>{
    const {fileId} = req.params
    const query = `delete from files where file_id = $1 returning *`;
    const deletedFile =await pool.query(query , [fileId]);
    res.status(StatusCodes.OK).json({ msg:deletedFile.rows[0] });
})