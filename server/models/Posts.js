const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  comments: [],
  likes: [],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
