const mongoose = require('mongoose');
// eslint-disable-next-line new-cap
const PostSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
