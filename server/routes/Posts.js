const express = require('express');
const router = express.Router();

const postsController = require('../controller/postController');
const checkAuth = require('../controller/checkAuth');

router.get('/', checkAuth, postsController.getPosts, (req, res) => {
  res.status(200).json(res.locals.posts);
});

router.post('/create', checkAuth, postsController.createPost, (req, res) => {
  res.status(200).json(res.locals.newPost);
});

router.delete(
  '/delete/:id',
  checkAuth,
  postsController.deletePost,
  (req, res) => {
    res.status(200).json(res.locals.deleted);
  },
);

router.patch(
  '/update/:id',
  checkAuth,
  postsController.updatePost,
  (req, res) => {
    res.status(200).json(res.locals.update);
  },
);

router.patch('/like/:id', checkAuth, postsController.like, (req, res) => {
  res.status(200).json(res.locals.likes);
});

router.patch('/comment/:id', checkAuth, postsController.comment, (req, res) => {
  res.status(200).json(res.locals.comments);
});

module.exports = router;
