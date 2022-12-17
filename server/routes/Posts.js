const express = require('express');
const router = express.Router();

const PostsController = require('../controller/postController');

router.get('/', PostsController.getPosts, (req, res) => {
  res.status(200).json(res.locals.posts);
});

router.post('/create', PostsController.createPost, (req, res) => {
  res.status(200).json(res.locals.newPost);
});

router.delete('/:id', PostsController.deletePost, (req, res) => {
  res.status(200).json(res.locals.deleted);
});

router.patch('/update/:id', PostsController.updatePost, (req, res) => {
  res.status(200).json(res.locals.update);
});

router.patch('/like/:id', PostsController.likes, (req, res) => {
  res.status(200).json(res.locals.likes);
});

router.patch('/comments/:id', PostsController.comments, (req, res) => {
  res.status(200).json(res.locals.comments);
});

module.exports = router;
