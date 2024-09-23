// routes/post.js

const express = require("express");
const authenticateMiddleware = require('../middleware/authMiddleware');

const { createPost, getPosts, getPostById, addCommentToPost, reportPost, deletePost } = require("../controllers/post");
const router = express.Router();

// To create a new post
router.post("/posts", authenticateMiddleware, createPost);

// To get all posts
router.get("/posts", authenticateMiddleware, getPosts);

// To get a post by ID
router.get("/posts/:id", authenticateMiddleware, getPostById);

// To add a comment to a post
router.post("/posts/:id/comments", authenticateMiddleware, addCommentToPost);

// To report a post
router.post("/posts/:id/reports", authenticateMiddleware, reportPost);

// To delete a post (only available to admin)
router.delete("/posts/:id", authenticateMiddleware, deletePost);

// Exporting the router
module.exports = router;
