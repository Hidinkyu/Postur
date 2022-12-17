const Post = require('../models/Posts');

const PostsController = {
  async getPosts (req, res, next) {
    try {
      const posts = await Post.find(); 
      res.locals.posts = posts;
      next()
    } catch (err) {
      next({
        log: 'Error caught at GET request for Posts controller',
        message: err.message,
      });
    }
  },
  createPost (req, res, next){
    try {
      const post = new Post({
        body: req.body.text,
      });
      post.save();
      res.locals.newPost = post;
      next();
    } catch (err) {
      next({
        log: 'Error caught at POST request for Posts controller',
        message: err.message,
      });
    }
  },
  async deletePost (req, res, next) {
    try {
      const result = await Post.findByIdAndDelete(req.params.id);
      res.locals.deleted = `deleted:\n${result}`
      next();
    } catch (err) {
      next({
        log: 'Error caught at DELETE request for Posts controller',
        message: err.message,
      });
    }
  },
  async updatePost (req, res, next) {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, {
        body: req.body.text,
      });
      post.save();
      res.locals.update = post;
      next();
    } catch (err) {
      next({
        log: 'Error caught at PUT (Update Message) request for Posts controller',
        message: err.message,
      });
    }
  },
  async likes (req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.likes.includes(req.body.userID)) {
        post.likes = post.likes.filter((user) => user !== req.body.userID);
      } else {
        post.likes.push(req.body.userID);
      }
      post.save();
      res.locals.likes = post;
      next()
    } catch (err) {
      next({
        log: 'Error caught at PUT (Likes) request for Posts controller',
        message: err.message,
      });
    }
  },
  async comments (req, res, next){
    try {
      const post = await Post.findById(req.params.id);
      post.comments.push(req.body.comment);
      post.save();
      res.locals.comments = post;
      next()
    } catch (err) {
      next({
        log: 'Error caught at PUT (comment) request for Posts controller',
        message: err.message,
      });
    }
  }
}

module.exports = PostsController