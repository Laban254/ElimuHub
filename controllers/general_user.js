
// This file contains all the controls related to any user of the system

const home = (req, res) => {
    console.log("Welcome to ElimuHub :)");
    res.end("Welcome to ElimuHub :)");
}

const delete_user = async(req, res) => {
    const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {home, delete_user};

