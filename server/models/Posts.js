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
  comments: [
    {
      id: {
        type: String
      },
      body: {
        type: String
      },
    }
  ],
  likes: [],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
