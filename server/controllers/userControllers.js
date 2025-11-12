const User = require("../models/users");

exports.approveFreelancer = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.status = "approved";
    await user.save();
    res.status(200).json({ message: "User approved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getUserById = async (req,res) =>{
  try {
    const {id} = req.params
    const user = await User.findById(id)
    if(!user){
      return res.status(404).json({ message: "User not found" }); 
    }
    res.status(200).json(user)
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.suspendUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { reason } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBanned = true;
    user.banReason = reason || "No reason provided";
    await user.save();

    res.status(200).json({ message: "User banned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
