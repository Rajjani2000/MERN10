const mongoose = require("mongoose");

const allpostSchema = new mongoose.Schema({
  classname: String,
  createdBy: String,
  classContents: [
    {
      title: String,
      role: String,
      content: String,
      report: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
          reason: String,
        },
      ],
      comment: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
          content: String,
        },
      ],
      reportCount: { type: Number, default: 0 },
      commentCount: { type: Number, default: 0 },
    },
  ],
});

const Post = mongoose.model("AllPost", allpostSchema);

module.exports = Post;
