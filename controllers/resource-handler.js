const resourceModel = require('../models/resources');
const path = require('path');
const fs = require('fs');


const getFileExtension = (filename) => {
    return '.' + filename.split('.').pop();
}

const uploadTutorial = (req, res) => {
    const fileFullName = req.file.originalname;
    const fileName = fileFullName.split('.')[0];
    const fileLocation = path.resolve(__dirname,`../public/Resources/Tutorials/${fileFullName}`);
    resourceModel.create({
        resourceName: fileName, resourceLocation: fileLocation, resourceType: 'tutorial'
    }).then((response)=>{
        res.send(response);
    })
};

const deleteTutorial = async (req, res) => {
    const fileName = req.body.fileName;
    const file = await resourceModel.findOneAndDelete({resourceName: fileName});
    if (file)
        res.send('File deleted Successfully!');
    else
        res.send('File not found');

    const fileLocation = file.resourceLocation;
    fs.unlink(fileLocation, (error) =>{
        if(error){
            console.log("file not found");
            return;
        }
    })
}

module.exports = {uploadTutorial, getFileExtension, deleteTutorial};