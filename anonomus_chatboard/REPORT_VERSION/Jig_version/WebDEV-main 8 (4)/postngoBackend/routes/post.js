const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  getPostsByRole,
  addCommentToPost,
  reportPost,
  deletePost
} = require("../controllers/post");

const router = express.Router();

// To create a new post
router.post("/posts",verifyToken, createPost);

// To get all posts
router.get("/posts", getPosts);

// To get a post by ID
router.get("/posts/:id", verifyToken, getPostsByRole);

// To add a comment to a post
router.post("/posts/:id/comments", verifyToken, addCommentToPost);

// To report a post
router.post("/posts/:id/reports",verifyToken, reportPost);

// To delete a post (only available to admin)
router.delete("/posts/:id",verifyToken, deletePost);

// Exporting the router
module.exports = router;
