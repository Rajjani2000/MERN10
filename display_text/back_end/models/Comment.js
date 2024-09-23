const mongoose = require('mongoose');
const User_P = require('../models/User');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
        }

    }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;