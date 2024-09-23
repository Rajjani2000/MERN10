const Post = require("../models/post");



exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Get the user or role information from the authentication middleware
    const createdBy = req.user; // Assuming user information is stored in req.user

    console.log('Creating post:', { title, content, createdBy });

    const newPost = await Post.create({
      title,
      content,
      createdBy,
    });

    console.log('New post created:', newPost);

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// This is the controller for getting all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// This is the controller for getting a post by ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('comments').populate('reports');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// This is the controller for adding a comment to a post by finding it by ID and adding a comment to it
exports.addCommentToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
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
      return res.status(404).json({ message: 'Post not found' });
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
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the post
    await post.remove();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};