const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { adminusername, adminpassword, classroomname, classroompassword } = req.body;

    const userExist = await User.findOne({ username: adminusername });
    if (userExist) {
      console.log("user Alreday Exist")
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      username: adminusername,
      password: adminpassword,
      role: 'admin',
    });

    await User.create({
      username: classroomname,
      password: classroompassword,
      role: 'classroom',
    });

    // Avoid returning sensitive information like passwords
    const { _id, username, role } = newUser.toObject();
    res.status(201).json({ _id, username, role });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { adminusername, adminpassword, classroomname, classroompassword } = req.query;

    let users;

    if (adminusername) {
      users = await User.find({ username: adminusername, role: 'admin' });
    } else if (classroomname) {
      users = await User.find({ username: classroomname, role: 'classroom' });
    } else {
      users = await User.find();
    }

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(adminpassword || classroompassword, user.password);

    if (!isMatch) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({ message: "Logged In Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
