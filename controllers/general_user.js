// This file contains all the controls related to any user of the system
const home = (req, res) => {
    console.log("Welcome to ElimuHub :)");
    res.send("Welcome to ElimuHub :)");
}

module.exports = {home}