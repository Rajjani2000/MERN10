const mongoose = require('mongoose');
const User = require('../models/user');
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [
    {
      content: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  reports: [
    {
      reason: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  commentCount: { type: Number, default: 0 },
  reportCount: { type: Number, default: 0 },
  createdAt: { type: mongoose.Schema.Types.Date, default: new Date() },
  // Add a reference to the user or role that created the post
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
