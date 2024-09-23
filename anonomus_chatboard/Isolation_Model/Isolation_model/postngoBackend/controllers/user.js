const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/allposts");

exports.createUser = async (req, res) => {
  try {
    const { adminusername, adminpassword, classroomname, classroompassword } =
      req.body;

    // Check for the existence of admin and classroom usernames
    const adminExist = await User.findOne({ username: adminusername });
    const classroomExist = await User.findOne({ username: classroomname });

    // if (adminExist || classroomExist) {
    //   return res
    //     .status(400)
    //     .json({ message: "User with the provided username already exists" });
    // }

    if (classroomExist) {
      return res
        .status(400)
        .json({ message: "User with the provided username already exists" });
    } else {
      // Create admin user
      const newAdminUser = await User.create({
        username: adminusername,
        password: adminpassword,
        role: "admin",
      });

      const createClassroom = {
        classname: classroomname,
        createdBy: adminusername,
        classContents: [],
      
      };

      await Post.create(createClassroom);
      // Create classroom user
      const newClassroomUser = await User.create({
        username: classroomname,
        password: classroompassword,
        role: "classroom",
      });
      // If both creations are successful, respond with admin user details
      const { _id, username, role } = newAdminUser.toObject();
      res.status(201).json({ _id, username, role });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received request with username:", username);
    console.log("Received request with password:", password);

    const user = await User.findOne({ username });

    console.log("Found user:", user);

    if (
      !user ||
      !password ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      console.log("Login failed due to invalid credentials");
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key");

    console.log("Login successful. Sending token:", token);

    res.status(200).json({
      message: "Logged In Successfully",
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
