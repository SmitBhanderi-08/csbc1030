const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postsController');

router.get('/', PostController.getAllPosts);

router.get('/:postId', PostController.getPostById);

router.get('/:postId/comments', PostController.getPostComments);

router.post('/', PostController.createPost);

router.post('/:postId/comments', PostController.addCommentToPost);

router.patch('/:postId', PostController.updatePost);

router.patch('/:postId/comments/:commentId', PostController.updateComment);

router.delete('/:postId/comments/:commentId', PostController.deleteComment);

module.exports = router;
