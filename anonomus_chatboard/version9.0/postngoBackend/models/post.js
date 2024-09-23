const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
      content: String,
    }
  ],
  reports: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Report' },
      reason: String,
    }
  ],
  commentCount: { type: Number, default: 0 },
  reportCount: { type: Number, default: 0 },
  // Add a reference to the user or role that created the post
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // test to see if User or user works
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
