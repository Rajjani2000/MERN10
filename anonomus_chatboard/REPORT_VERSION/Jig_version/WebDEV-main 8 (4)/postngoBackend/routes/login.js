const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require("../models/post");
const requireLogin = require('../middleware/authMiddleware');

router.get('/user/:id', requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const posts = await Post.find({ createdBy: req.params.id })
      .populate('createdBy', '_id name')
      .exec();

    res.json({ user, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;