const Post = require('../models/Posts');

const postsController = {
  async getPosts(req, res, next) {
    try {
      const posts = await Post.find();
      res.locals.posts = posts;
      next();
    } catch (err) {
      next({
        log: 'Error caught at GET request for Posts controller',
        message: err.message,
      });
    }
  },
  createPost(req, res, next) {
    try {
      const post = new Post({
        body: req.body.text,
        username: req.user.username,
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
  async deletePost(req, res, next) {
    try {
      const result = await Post.findById(req.params.id);
      if (result.username === req.user.username) {
        console.log('post deleted successfully');
        result.delete();
        res.locals.deleted = `deleted:\n${result}`;
      } else {
        return res
          .status(400)
          .json({ message: 'you are not allowed to delete' });
      }
      next();
    } catch (err) {
      next({
        log: 'Error caught at DELETE request for Posts controller',
        message: err.message,
      });
    }
  },
  async updatePost(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.user.username) {
        post.body = req.body.text;
        post.save();
      } else {
        return res.sendStatus(405);
      }
      next();
    } catch (err) {
      next({
        log: 'Error caught at PATCH (Update Message) request for Posts controller',
        message: err.message,
      });
    }
  },
  async like(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.likes.includes(req.user.username)) {
        post.likes = post.likes.filter((user) => user !== req.user.username);
      } else {
        post.likes.push(req.user.username);
      }
      post.save();
      res.locals.likes = post;
      next();
    } catch (err) {
      next({
        log: 'Error caught at PATCH (Likes) request for Posts controller',
        message: err.message,
      });
    }
  },
  async comment(req, res, next) {
    console.log(req.body);
    try {
      const post = await Post.findById(req.params.id);
      const comment = {
        username: req.user.username,
        body: req.body.comment,
      };
      post.comments.unshift(comment);
      post.save();
      res.locals.comments = post;
      next();
    } catch (err) {
      next({
        log: 'Error caught at PATCH (comment) request for Posts controller',
        message: err.message,
      });
    }
  },
};

module.exports = postsController;
