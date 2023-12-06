const express = require('express');
const {uploadTutorial, getFileExtension, deleteTutorial} = require('../controllers/resource-handler.js');
const path = require('path');

const multer = require('multer');
const router = express.Router();

router.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where you want to store the files
        cb(null, path.resolve(__dirname,'../public/Resources/Tutorials'));
    },
    filename: (req, file, cb) => {
        const allowedExtensions = ['.mp4', '.mpeg', '.mkv'];
        const fileExtension = getFileExtension(file.originalname);

        if (allowedExtensions.includes(fileExtension)) {
            // If the extension is acceptable, the file should be uploaded and name remain as is.
            cb(null, file.originalname);
        } else {
            // If the extension is not acceptable, reject the file
            cb(new Error('Invalid file extension'));
        }
    }
});

const upload = multer({ storage: storage });

router.post('/upload-tutorial', upload.single('tutorialFile'), uploadTutorial);
router.delete('/delete-tutorial', deleteTutorial);


module.exports = router;