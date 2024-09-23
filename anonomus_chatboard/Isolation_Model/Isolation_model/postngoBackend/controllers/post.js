const Post = require("../models/allposts");
const User = require("../models/user");

exports.createPost = async (req, res) => {
  try {
    const { title, content, userInfo, cname, adminuser } = req.body;

    // console.log(userInfo);
    // Use the userId extracted from the token
    const createdBy = req.userId; // Change from req.username to req.userId

    // console.log("Creating post:", { title, content, createdBy });

    const post = await Post.findOne({
      classname: cname,
      createdBy: userInfo.className, //this might cause errors
    });

    console.log(post);
    if (!post) {
      // const newPost = {
      //   classname: userInfo.className,
      //   classContents: [
      //     {
      //       title: title,
      //       content: content,
      //       createdBy: createdBy,
      //     },
      //   ],
      // };

      // await Post.create(newPost);
      console.log("no class exist");
    } else {
      const newPost = {
        title: title,
        role: userInfo.role,
        content: content,
        createdBy: createdBy,
      };

      post.classContents.push(newPost);

      await post.save();
      console.log("New post created:", newPost);

      res.status(201).json(newPost);
    }
  } catch (error) {
    console.error("Ebackenderror", error);
    res.status(500).json({ message: "backenderror Server Error" });
  }
};

//to really to much  important
// This is the controller for getting all posts
exports.getPosts = async (req, res) => {
  const { cname, role, adminuser } = req.query;
  let posts;

  if (role === "admin") {
    try {
      posts = await Post.find({ createdBy: cname });
      res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    try {
      if (adminuser !== "undefined") {
        posts = await Post.find({
          classname: cname,
          createdBy: adminuser,
        });
      } else {
        posts = await Post.find({ classname: cname });
      }
      console.log({ classname: cname, createdBy: adminuser });

      res.json(posts[0].classContents);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

// controllers/post.js

exports.getPostsByRole = async (req, res) => {
  try {
    const { role } = req.query;

    // Find the user by role
    const user = await User.findOne({ role: decodedToken.username }).populate({
      path: "Post",
      populate: [{ path: "Comment" }, { path: "Report" }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = user.posts;

    console.log("Posts retrieved for user:", { role, posts });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// This is the controller for adding a comment to a post by finding it by ID and adding a comment to it
exports.addCommentToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = await Comment.create({ content });
    post.comments.push(newComment);
    post.commentCount += 1;

    await post.save();

    res.json(newComment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// This is the controller for reporting a post by finding it by ID and adding a report to it
exports.reportPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { reason } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newReport = await Report.create({ reason });
    post.reports.push(newReport);
    post.reportCount += 1;

    await post.save();

    res.json(newReport);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// This is the controller for deleting a post by finding it by ID and removing it from the database
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post
    await post.remove();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
