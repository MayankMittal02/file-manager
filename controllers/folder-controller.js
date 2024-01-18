const pool = require('../connection')
const asycnWrapper = require('../middleware/async')

// const createFolder = asycnWrapper(async(req , res)=>{
//     const {folderName} = req.body;


// })

const createFolder = async (req, res) => {
    const { folderName, userId } = req.body;
    // const {userId} = req.user.userId
    try {
        if (!folderName) {
            return res.status(400).json({ msg: "provide folder name" });
        }

        const sameNameQuery = `select * from folders where folder_name = $1`
        const sameNameFolder = await pool.query(sameNameQuery, [folderName]);

        if (sameNameFolder.rows.length !== 0) {
            return res.status(409).json({ error: 'Folder with the same name already exists.' });
        }

        const query = `insert into folders(folder_name , user_id) values ($1,$2) returning *`
        const createdFolder = await pool.query(query, [folderName, userId]);

        res.status(201).json({ msg: createdFolder.rows[0] });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

const createSubFolder = asycnWrapper(async (req, res) => {
    const { folderName, userId } = req.body;
    const { parentFolderId } = req.params;

    if (!folderName) {
        return res.status(400).json({ msg: "provide folder name" });
    }
    const query = 'insert into folders(folder_name , user_id , parent_folder_id) values($1,$2,$3) returning*'
    const createdFolder = await pool.query(query, [folderName, userId, parentFolderId]);
    res.status(201).json({ msg: createdFolder.rows[0] });


})



module.exports = { createFolder, createSubFolder }