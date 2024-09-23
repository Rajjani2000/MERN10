const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    text: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    text: true,
  },
  role: {
    type: String,
    enum: ['admin', 'classroom'],
    required: [true, 'Role is required'],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.statics.findUser = async function (query) {
  return this.find(query);
};

const User = mongoose.model('User', userSchema);

module.exports = User;