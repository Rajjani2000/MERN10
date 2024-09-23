const Post = require("../models/post");
const User = require('../models/user');


exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Use the userId extracted from the token
    const createdBy = req.userId; // Change from req.username to req.userId


    console.log('Creating post:', { title, content, createdBy });

    const newPost = await Post.create({
      title,
      content,
      createdBy,
    });

    // Update the user's posts array
    await User.findOneAndUpdate({ _id: createdBy }, { $push: { posts: newPost._id } });

    console.log('New post created:', newPost);

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Ebackenderror', error);
    res.status(500).json({ message: 'Ebackenderror Server Error' });
  }
};

//to really to much  important 
// This is the controller for getting all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controllers/post.js

exports.getPostsByRole = async (req, res) => {
  try {
    const { role } = req.query;

    // Find the user by role
    const user = await User.findOne({ role: decodedToken.username }).populate({
      path: 'Post',
      populate: [
        { path: 'Comment' },
        { path: 'Report' },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const posts = user.posts;

    console.log('Posts retrieved for user:', { role, posts });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// This is the controller for adding a comment to a post by finding it by ID and adding a comment to it
exports.addCommentToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('comment: ', comment);
    const newComment = { content: comment, user: post.createdBy }
    console.log('post: ', post);
    post.comments.push(newComment);
    post.commentCount += 1;

    await post.save();

    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};





// This is the controller for reporting a post by finding it by ID and adding a report to it
exports.reportPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { reason } = req.body;

    // Validate request data
    if (!reason) {
      return res.status(400).json({ message: "Reason for report is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newReport = { reason, post: post, user: post.createdBy };
    post.reports.push(newReport);
    post.reportCount += 1;

    await post.save();

    // Respond with the new report data
    res.status(201).json(newReport);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the post
    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};